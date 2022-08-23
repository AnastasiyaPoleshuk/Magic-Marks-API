const express = require("express");
const bodyParser = require('body-parser');
const helthckeck = require('./helthcheck/helthcheck')
const constants = require('./utils/constants');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

helthckeck(app, constants.CONSTANTS.HELTHCHECK);

const server = app.listen(server.address().port || constants.CONSTANTS.PORT, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});