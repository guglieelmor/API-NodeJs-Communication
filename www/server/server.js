const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const config = require('config');
const log = require('../log/log');
const pinoHTTP = require('pino-http')({ logger: log});
const monitor = require('express-status-monitor')();

module.exports = () => {
    const app = express();

    app.use(bodyParser.json());

    app.use(pinoHTTP);

    app.use(monitor);

    consign().include('./www/controllers').into(app);

    app.listen(config.get('api.port'), () => console.log('Server on!'));
    
    return app;
}
