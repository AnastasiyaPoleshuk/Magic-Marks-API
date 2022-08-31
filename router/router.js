const getHealthStatus = require('../healthcheck/healthcheck');
const loginUser = require('../login/login');

const router = (app) => {
    app.get('/helthckeck', (request, response) => {
        const responseData = getHealthStatus();
        response.send(responseData);
    });
    app.get('/', (request, response) => {
        response.send('hello node');
    });
    app.post('/login', (request, response) => {
        const responseData = loginUser(request, response);
        response.send(responseData);
    });

}

module.exports = router;