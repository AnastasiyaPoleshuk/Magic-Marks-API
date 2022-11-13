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
  app.post('/login', async (request, response) => {
    loginUser(request, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.responseData);
      })
  });
  app.get('/marks', (async (request, response) => {
    getMarks(request.query, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.marksData);
      });
  }));
  app.put('/marks', (async (request, response) => {
    updateMarks(request, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.marksData);
      });
  }));
  app.get('/user', (async (request, response) => {
    getUser(request, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.data);
      });
  }));

};

module.exports = router;