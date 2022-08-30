const getHealthStatus = require('../healthcheck/healthcheck');

const router = (app) => {
    app.get('/helthckeck', (request, response) => {
        const responseData = getHealthStatus();
        response.send(responseData);
    });
    app.get('/', (request, response) => {
        response.send('hello node');
    });

}

module.exports = router;