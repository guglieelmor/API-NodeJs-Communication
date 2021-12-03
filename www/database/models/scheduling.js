const Sequelize = require('sequelize');
const db = require('../database');

const column = {
    recipient: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    message: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    scheduling_date: {
        type: Sequelize.DATEONLY, 
        allowNull: false
    },
    scheduling_hour: {
        type: Sequelize.STRING, 
        allowNull: false
    }
};

const options = {
    freezeTableName: true,
    tableName: 'scheduling',
    timestamps: true
};

module.exports = db.define('scheduling', column, options);