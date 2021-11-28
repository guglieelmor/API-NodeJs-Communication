// Configurações do servidor

const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const config = require('config')

module.exports = () => {
    const app = express();

    app.use(bodyParser.json())

    consign().include('./www/controllers').into(app)

    app.listen(config.get('api.port'), () => console.log('Server on!'))
    
    return app
}
