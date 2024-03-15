const express = require('express');
const User = require('../database/models/User');
const Note = require('../database/models/Notes');
const { handleErrorResponse } = require('../utils');

const router = express.Router();

router.get('/', async function(req, res) {
    try {
        const userId = req.user.id; 
        const notes = await Note.findAll({ where: { userId: userId } });
        res.status(200).json({ success: true, message: "Notes", data: notes });
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving notes');
    }
});

router.get('/user/:userId', async function(req, res){
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found', data: {} });
        }
        
        const notes = await Note.findAll({ where: { userId: userId } });
        return res.status(200).json({ success: true, message: 'Notes found', data: notes });
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving notes');
    }
});
router.get('/notes/:id', async function(req, res) {
    try {
        const noteId = req.params.id;
        const note = await Note.findByPk(noteId);
        if (note) {
            res.status(200).json({ success: true, message: "Note found", data: note });
        } else {
            res.status(404).json({ success: false, message: "Note not found" });
        }
    } catch (error) {
        handleErrorResponse(res, error, 'Error retrieving note');
    }
});
router.post('/', async function(req, res) {
    try {
        const { userId, titlu, tag, continut } = req.body;

        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const note = await Note.create({ titlu, tag, continut, userId });
        res.status(201).json({ success: true, message: "Note created", data: note });
    } catch (error) {
        handleErrorResponse(res, error, 'Error creating note');
    }
});

router.put('/:id', async function(req, res) {
    try {
        const noteId = req.params.id;
        const note = await Note.findByPk(noteId);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found', data: {} });
        }

        const updatedNote = await note.update(req.body);
        return res.status(200).json({ success: true, message: 'Note updated', data: updatedNote });
    } catch (error) {
        handleErrorResponse(res, error, 'Error updating note');
    }
});

router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const note = await Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found', data: {} });
        }

        await note.destroy();
        return res.status(200).json({ success: true, message: 'Note deleted' });
    } catch (error) {
        handleErrorResponse(res, error, 'Error deleting note');
    }
});

module.exports = router;
