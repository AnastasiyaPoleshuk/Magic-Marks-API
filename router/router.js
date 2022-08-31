const getHealthStatus = require('../healthcheck/healthcheck');

const router = (app) => {
    app.get('/healthcheck', (request, response) => {
        const responseData = getHealthStatus();
        response.send(responseData);
    });
    app.get('/', (request, response) => {
        response.send('Magic Marks API');
    });

}

module.exports = router;