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

  const signature = `${Date.now()}`;

  return jwt.sign({ data, }, signature);
}

module.exports = loginUser;
