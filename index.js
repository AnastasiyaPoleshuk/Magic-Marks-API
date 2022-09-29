const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const router = require('./router/router')
const constants = require('./utils/constants');
const cors = require("cors");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(cors());

router(app);

const server = app.listen(process.env.PORT || constants.CONSTANTS.PORT, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});