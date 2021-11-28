const Sequelize = require('sequelize')
const path = require('path')

process.env["NODE_CONFIG_DIR"] = path.join(__dirname, '../../config');

const config = require('config')

console.log('NODE_CONFIG_DIR: ' + config.util.getEnv('NODE_CONFIG_DIR'));

const seq = new Sequelize(
    config.get('database.name'), 
    config.get('database.user'), 
    config.get('database.password'),
    {
        host: config.get('database.host'), 
        dialect: config.get('database.dialect'),
        port: config.get('database.port')
    }
)

module.exports = seq
