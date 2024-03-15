const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../database/models/User');
const { handleErrorResponse } = require('../utils');

const router = express.Router();

router.post('/login', async function(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!email.endsWith('@stud.ase.ro')) {
            return res.status(400).json({ success: false, message: "Please use your institutional email" });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        delete user.dataValues.password;

        res.status(200).json({ success: true, message: "User found", user });
    } catch (error) {
        handleErrorResponse(res, error, "Error login user");
    }
});

module.exports = router;