const getHealthStatus = require('../healthcheck/healthcheck');
const loginUser = require('../login/login');
const getMarks = require('../getMarks/getMarks');
const updateMarks = require('../updateMarks/updateMarks');
const getUser = require('../user/user');

// const express = require("express");


const router = (Router) => {
  // const Router = express.Router();
  
  Router.get('/healthcheck', (request, response) => {
    const responseData = getHealthStatus();
    response.send(responseData);
  });
  Router.get('/', (request, response) => {
    response.send('Magic Marks API');
  });

  Router.get('/healthcheck', (request, response) => {
    const responseData = getHealthStatus();
    response.send(responseData);
  });
  Router.get('/', (request, response) => {
    response.send('Magic Marks API');
  });
  Router.post('/login', async (request, response) => {
    loginUser(request, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.responseData);
      })
  });
  Router.get('/marks', (async (request, response) => {
    getMarks(request.query, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.marksData);
      });
  }));
  Router.put('/marks', (async (request, response) => {
    updateMarks(request, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.marksData);
      });
  }));
  Router.get('/user', (async (request, response) => {
    getUser(request, response)
      .then((responseData) => {
        response.status(responseData.status).send(responseData.data);
      });
  }));

};

module.exports = router;