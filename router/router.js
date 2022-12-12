const getHealthStatus = require('../routs/healthcheck/healthcheck');
const loginUser = require('../routs/login/login');
const getMarks = require('../routs/getMarks/getMarks');
const updateUser = require('../routs/updateUser/updateUser');
const updateMarks = require('../routs/updateMarks/updateMarks');
const getUser = require('../routs/user/user');
const createUser = require('../routs/createUser/createUser');
const deleteUser = require('../routs/deleteUser/deleteUser');


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
  app.put('/user', (async (request, response) => {
    updateUser(request, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.user);
      });
  }));
  app.get('/user', (async (request, response) => {
    getUser(request, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.data);
      });
  }));
  app.post('/user', (async (request, response) => {
    createUser(request, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.message);
      });
  }));
  app.delete('/user', (async (request, response) => {
    deleteUser(request.query, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.message);
      });
  }));

};

module.exports = router;