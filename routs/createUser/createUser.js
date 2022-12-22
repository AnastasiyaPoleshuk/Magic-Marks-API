const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const { GetDbInfo } = require('../../utils/dbQuery');
const constants = require('../../utils/constants');

const createUser = async (req, res) => {
  const user = req.body;
  const response = await setUser(user)
    .then((data) => {
      return data;
    })

  return response;
}

async function setUser(user) {
  const response = {
    data: {
      isUserCreated: false,
      message: "user already exist"
    },
    status: StatusCodes.StatusCodes.BAD_REQUEST,
  };
  const dBName = constants.CONSTANTS.DATABASE === "Postgree" ? '"user"' : "[user]";

  const isNewUser = await checkUserEmail(user.email, dBName);
  if (!isNewUser) {
    return response;
  };

  const hashedPassword = await hashPassword(user.password);
  const userId = await createUserId(dBName);
  const res = await GetDbInfo(`INSERT INTO ${dBName} VALUES(
      ${userId},
      '${user.email}',
      N'${user.firstName}',
      N'${user.lastName}',
      ${user.class},
      '${hashedPassword}')`
  );
  response.data = { 
    isUserCreated: true,
    message: "user successfully created"
  };
  response.status = StatusCodes.StatusCodes.OK;
  return response;
}

async function checkUserEmail(email, dBName) {
  let isNewUser = true;


  const res = await GetDbInfo(`SELECT * FROM ${dBName} where email = '${email}'`);
  if (res[0]) {
    isNewUser = false;
  }
  return isNewUser;
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

async function createUserId(dBName) {
  const res = await GetDbInfo(`SELECT userid FROM ${dBName}`);
  if (res.length > 0) {
    const lastUserId = res[res.length - 1];
    const currentUserId = lastUserId.userid + 1;
    return currentUserId;
  } else {
    return constants.CONSTANTS.FIRST_USER_IN_DB;
  }

}

module.exports = createUser;