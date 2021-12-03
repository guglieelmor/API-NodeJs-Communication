const scheduling = require('../database/models/scheduling');
const moment = require('moment');
const log = require('../log/log');
const { body, check, validationResult } = require("express-validator");
const hours = new RegExp(/^(10|11|12|[1-9]):[0-5][0-9]$/);
const numbers = new RegExp(/^[0-9.]+$/);

module.exports = app => {
    app.post(
        '/api/scheduling/create',
        body('recipient', 'Required field email, example: yourEmail@email.com').isEmail(),
        body('message', 'Define the message of the subject to be treated: minimum length of seven (7) characters.').isLength({ min: 7 }),
        body('message', 'Define the message of the subject to be treated: maximum length of fifty (50) characters.').isLength({ max: 35 }),
        check('scheduling_hour', 'Set a time, example: HH:MM').matches(hours),
        async (request, response) => {
            log.info("Call -> /api/scheduling/create");
            let errors = validationResult(request);
            const req = request.body;
            const now = moment().format('YYYY-MM-DD');
            const date = moment(req.scheduling_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

            if (!errors.isEmpty()) {
                return response.status(400).json({ errors: errors.array() }).json();
            }

            if(!moment(date).isSameOrAfter(now)){
                return response.status(400).json({ errors: { "value": req.scheduling_date, "msg": "Set a date higher than now.", "param": "scheduling_hour", "location": "body" } }).json();
            }

            try {
                const data = {
                    "recipient": req.recipient,
                    "message": req.message,
                    "status": 1,
                    "scheduling_date": date,
                    "scheduling_hour": req.scheduling_hour
                };

                await scheduling.create(data)
                    .then(result => {
                        response.status(201).send({ "status": 1, "message": "Successfully aged!", "aged": result }).json();
                    })
                    .catch(error => {
                        response.status(500).send({ "status": 0, "message": error }).json();
                    });

            } catch (error){
                response.status(500).send({ "status": 0, "message": error });
            }
    });

    app.get(
        '/api/scheduling/list/:id',
        async (request, response) => {
            log.info(`Call -> /api/scheduling/list/${request.params.id}`);
            try {

                if(!numbers.test(request.params.id)){
                    response.status(400).send({ "status": 0, "message": "Unsupported parameter" }).json();
                }

                const aged = await scheduling.findOne({
                    where: {
                        id: request.params.id
                    }
                });

                if(!aged){
                    response.status(404).send({ "status": 0, "message": "Appointment not found!" }).json();
                } else {
                    response.status(200).send({ "status": 1, "message": "Find aged!", "aged": aged }).json();
                }

            } catch (error){
                response.status(500).send({ "status": 0, "message": error });
            }
    });

    app.patch(
        '/api/scheduling/cancel/:id',
        async (request, response) => {
            log.info(`Call -> /api/scheduling/cancel/${request.params.id}`);
            try {

                if(!numbers.test(request.params.id)){
                    response.status(400).send({ "status": 0, "message": "Unsupported parameter" }).json();
                }

                await scheduling.update(
                    {
                        status: '2'
                    },
                    {
                        where: {
                            id: request.params.id
                        }
                    }).then(() => {
                          response.status(200).send({ "status": 1, "message": `Schedule ${request.params.id} canceled successfully!`})
                       })
                      .catch(error => {
                          response.status(500).send({ "status": 0, "message": error })
                      });

            } catch (error){
                response.status(500).send({ "status": 0, "message": error });
            }
    });
}
