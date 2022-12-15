const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require('body-parser');
const router = require('./router/router')
const constants = require('./utils/constants');

const app = express();
const Router = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(cors());
app.use(`/.netlify/functions/api`, Router);

router(Router);

const server = app.listen(process.env.PORT || constants.CONSTANTS.PORT, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});

module.exports.handler = serverless(app);
