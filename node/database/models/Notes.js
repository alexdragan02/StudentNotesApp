const Sequelize = require('sequelize');
const {sequelize} = require('../server');

const Notes = sequelize.define("Notes", {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    },
    titlu: Sequelize.STRING,
    tag: Sequelize.STRING,
    continut: Sequelize.STRING,
})

module.exports = Notes;