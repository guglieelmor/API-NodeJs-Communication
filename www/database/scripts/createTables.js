const scheduling = require('../models/scheduling');
const status = require('../models/status');
const log = require('../../log/log')

try {
    status.sync()
        .then(() => log.info('Status table created successfully!'))
        .catch((error) => log.error(error))

    try {
        status.findOrCreate({
                where: {
                    id: 1
                },
                defaults: {
                    name: 'scheduled'
                }
            }).then(function(result) {
                status.findOrCreate({
                    where: {
                        id: 2
                    },
                    defaults: {
                        name: 'canceled'
                    }
                }).then(function(result) {
                    status.findOrCreate({
                        where: {
                            id: 3
                        },
                        defaults: {
                            name: 'sent'
                        }
                    });
                });
        });

    } catch(error){
        log.error(error);
    }

    scheduling.sync()
        .then(() => log.info('Scheduling table created successfully!'))
        .catch((error) => log.error(error));

} catch (error) {
    log.error(error);
}