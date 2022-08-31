const constants = require('../utils/constants')

const loginUser = (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const userEmail = req.body.Email;
  const userPassword = req.body.Password;
  const user = { email: userEmail, password: userPassword };

  const checkResponse = checkUserCredentials(user)

  res.status(checkResponse.status).send(checkResponse.responseData);
};

function checkUserCredentials(userData) {
  let responseData;
  if (
    userData.email === constants.CONSTANTS.USER.Email &&
    userData.password === constants.CONSTANTS.USER.Password
  ) {
    responseData = {
      isAuthenticated: true,
      accsess_token: createToken(),
    };
    const status = 200;
    return { responseData, status };
  } else {
    responseData = {
      isAuthenticated: false,
      accsess_token: '',
    };
    const status = 401;
    return { responseData, status };
  };
}

function createToken() {
  return constants.CONSTANTS.MOCK_TOKEN;
}

module.exports = loginUser;