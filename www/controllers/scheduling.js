const scheduling = require('../database/models/scheduling');

module.exports = app => {
    app.post('/api/scheduling/create', async (request, response) => { 
        try {
            const req = request.body;
            const data = {
                "recipient": req.recipient, 
                "message": req.message, 
                "status": 1,
                "scheduling_date": req.scheduling_date,
                "scheduling_hour": req.scheduling_hour
            };
            await scheduling.create(data)
                .then(result => response.send({
                    "status": 1,
                    "message": "Successfully aged!",
                    "aged": result
                }))
                .catch(error => response.send({
                    "status": 0,
                    "message": error
                }));

        } catch (error){
            response.send({
                "status": 0,
                "message": error
            });

        }
    });

    app.get('/api/scheduling/list/:id', async (request, response) => { 
        try {
            const aged = await scheduling.findOne({
                where: {
                    id: request.params.id
                }
            });
    
            response.contentType('application/json');
    
            if(!aged){
                response.send({
                    "status": 0,
                    "message": "Not found!"
                });
    
            } else {
                response.send({
                    "status": 1,
                    "message": "Find aged!",
                    "aged": aged
                });
    
            }

        } catch (error){
            response.send({
                "status": 0,
                "message": error
            });
            
        }
    });

    app.put('/api/scheduling/update/:id', async (request, response) => {
        try {
            const data = request.body;

            await scheduling.update(
                { status: '2' },
                { where: { id: request.params.id } }
            
                ).then(function() { 
                    console.log('asdasdasdasd')
                    response.send({
                        "status": 1,
                        "message": `Schedule ${request.params.id} canceled successfully!` 
                    });
              
               }).catch(function(error) { 
                    response.send({
                        "status": 0,
                        "message": error
                    });
              
               });

        } catch (error){
            response.send({
                "status": 0,
                "message": error
            });
            
        }
    });
}
