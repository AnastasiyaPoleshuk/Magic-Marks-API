const getHealthStatus = require('../healthcheck/healthcheck');
const loginUser = require('../login/login');
const getMarks = require('../getMarks/getMarks');
const updateMarks = require('../updateMarks/updateMarks');
const getUser = require('../user/user');


const router = (app) => {
  app.get('/healthcheck', (request, response) => {
    const responseData = getHealthStatus();
    response.send(responseData);
  });
  app.get('/', (request, response) => {
    response.send('Magic Marks API');
  });
  app.post('/login', (request, response) => {
    const responseData = loginUser(request, response);
    response.send(responseData);
  });
  app.get('/marks', (request, response) => {
    const responseData = getMarks(request.query, response);
    response.send(responseData);
  });
  app.put('/marks', (request, response) => {
    const responseData = updateMarks(request, response);
    response.send(responseData);
  });
  app.get('/user', (request, response) => {
    const responseData = getUser(request.query.token, response);
    response.send(responseData);
  });

};

module.exports = router;