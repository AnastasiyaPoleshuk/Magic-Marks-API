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
  const responseData = {
    isAuthenticated: true,
    accsess_token: '',
  };
  let status;

  if (
    userData.email === constants.CONSTANTS.MOCK_USER.Email &&
    userData.password === constants.CONSTANTS.MOCK_USER.Password
  ) {
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