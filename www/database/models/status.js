const Sequelize = require('sequelize');
const db = require('../database');

const column = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING, 
        allowNull: false
    }
};

const options = {
    freezeTableName: true,
    tableName: 'status',
    timestamps: true
};

module.exports = db.define('status', column, options);