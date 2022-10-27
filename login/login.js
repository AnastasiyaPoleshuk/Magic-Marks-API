const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../queries/queries');

const loginUser = async (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
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

  const { rows } = await db.queryWithParams('SELECT * FROM "user" where email=$1', [userData.email]);

  const compare = bcrypt.compareSync(userData.password, rows[0].passwordhash);

  if (
    userData.email === rows[0].email &&
    compare
  ) {
    responseData.accsess_token = createToken(rows[0]);
    status = StatusCodes.StatusCodes.OK;
    db.queryWithParams('INSERT INTO "login" VALUES($1, $2, $3)', [+rows[0].userid, responseData.accsess_token, createExpirationTime()]);
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
  const dateNow = new Date();
  dateNow.setMinutes(dateNow.getMinutes() + 30);
  const currentDate = dateNow.toLocaleDateString().split('/');
  const currentTime = dateNow.toLocaleTimeString().slice(0, -6);
  const expipation = new Date(`${currentDate[2]}-${currentDate[0]}-${currentDate[1]}T${currentTime}`);
  return expipation;
}

module.exports = loginUser;
