const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const GetDbInfo = require('../utils/dbQuery');
const constants = require('../utils/constants');

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
    data: {}
  };
  let status = StatusCodes.StatusCodes.OK;

  const tableName = constants.CONSTANTS.DATABASE === "Postgree" ? '"user"' : "[user]";
  const userDb = await GetDbInfo(`SELECT * FROM ${tableName} where email = '${userData.email}'`);
  const isValidPassword = bcrypt.compareSync(userData.password, userDb[0].passwordhash);

  if (
    userData.email === userDb[0].email &&
    isValidPassword
  ) {
    responseData.accsess_token = createToken(userDb[0]);
    status = StatusCodes.StatusCodes.OK;
    const expiration = createExpirationTime();
    const queryString = constants.CONSTANTS.DATABASE === "Postgree" ?
      `INSERT INTO "login" VALUES(
        ${+userDb[0].userid},
        '${responseData.accsess_token}',
        ${expiration}
      )`:
      `INSERT INTO "login" VALUES
      (
        ${+userDb[0].userid},
        '${responseData.accsess_token}',
        DATETIMEFROMPARTS ( 
          ${expiration.year}, 
          ${expiration.month}, 
          ${expiration.day}, 
          ${expiration.hour}, 
          ${expiration.minute}, 
          ${expiration.seconds}, 
          ${expiration.milliseconds}
        )
      )`;
    await GetDbInfo(queryString);
    const resTest = await GetDbInfo(`SELECT * FROM "login" WHERE token = '${responseData.accsess_token}'`);
    responseData.data = resTest;
    console.log(resTest);
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

function createExpirationTime(db) {
  if (db === "Postgree") {
    const expiration = moment().add(30, 'minute');
    return expiration;
  } else {
    const template = moment().add(30, 'minute');
    const expiration = {
      year: moment(template).year(),
      month: moment(template).month(),
      day: moment(template).date(),
      hour: moment(template).hour(),
      minute: moment(template).minute(),
      seconds: moment(template).seconds(),
      milliseconds: moment(template).milliseconds()
    }
    return expiration;
  }

}

module.exports = loginUser;
