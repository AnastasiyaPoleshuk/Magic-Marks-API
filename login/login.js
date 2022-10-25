const constants = require('../utils/constants');
const bcrypt = require('bcrypt');
const getUserByDatabase = require('../queries/queries');

const loginUser = (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }

  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const user = { email: userEmail, password: userPassword };

  const checkResponse = checkUserCredentials(user)
  res.status(checkResponse.status).send(checkResponse.responseData);
  return;
};

function checkUserCredentials(userData) {
  const responseData = {
    isAuthenticated: true,
    accsess_token: '',
  };
  let status;

  getUserByDatabase()

  if (
    userData.email === constants.CONSTANTS.MOCK_USER.Email &&
    userData.password === constants.CONSTANTS.MOCK_USER.Password
  ) {
    const salt = bcrypt.genSaltSync(10);
    const passwordToSave = bcrypt.hashSync(`${userData.password}`, salt);
    responseData.accsess_token = createToken();
    status = 200;
  } else {
    responseData.isAuthenticated = false;
    status = 401;
  };

  return { responseData, status };
}

function createToken() {
  return constants.CONSTANTS.MOCK_TOKEN;
}

module.exports = loginUser;