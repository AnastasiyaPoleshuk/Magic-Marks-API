const express = require("express");
const bodyParser = require('body-parser');
const router = require('./router/router')
const constants = require('./utils/constants');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

router(app);

const server = app.listen(process.env.PORT || constants.CONSTANTS.PORT, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});