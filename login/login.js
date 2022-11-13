const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const db = require('../queries/queries');

const loginUser = async (req, res) => {
  if (!req.body) {
    return res.sendStatus(StatusCodes.StatusCodes.BAD_REQUEST);
  }

  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const user = { email: userEmail, password: userPassword };

  const response = await checkUserCredentials(user, res)
    .then((data) => {
      return data;
    })

  return response;

};

async function checkUserCredentials(userData) {
  const responseData = {
    isAuthenticated: true,
    accsess_token: '',
  };
  let status = StatusCodes.StatusCodes.OK;

  const { rows: userDb } = await db.queryWithParams('SELECT * FROM "user" where email=$1', [userData.email]);

  const isValidPassword = bcrypt.compareSync(userData.password, userDb[0].passwordhash);

  if (
    userData.email === userDb[0].email &&
    isValidPassword
  ) {
    responseData.accsess_token = createToken(userDb[0]);
    status = StatusCodes.StatusCodes.OK;
    db.queryWithParams('INSERT INTO "login" VALUES($1, $2, $3)', [+userDb[0].userid, responseData.accsess_token, createExpirationTime()]);
  } else {
    responseData.isAuthenticated = false;
    status = StatusCodes.StatusCodes.UNAUTHORIZED;
  };

  return { responseData, status };
}

function createToken(user) {
  const data = {
    _id: user.userid,
    name: user.firstname,
    email: user.email,
  };

  const signature = `${new Date()}`;

  return jwt.sign({ data, }, signature);
}

function createExpirationTime() {
  const expiration = moment().add(30, 'minute');
  return expiration;
}

module.exports = loginUser;
