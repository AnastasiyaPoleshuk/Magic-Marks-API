const helthckeck = (app, data) => {
  app.get('/helthckeck', (request, response) => {
    response.send(data);
  });

}

module.exports = helthckeck;
