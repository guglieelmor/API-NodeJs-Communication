(async () => {
    const scheduling = require('../models/scheduling')
    const status = require('../models/status')

    try {
        status.sync()
            .then(() => console.log('Status table created successfully!'))
            .catch(console.log);

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
            console.log(error)
        }

        scheduling.sync()
            .then(() => console.log('Scheduling table created successfully!'))
            .catch(console.log);

    } catch (error) {
        console.log(error);
    }
})();