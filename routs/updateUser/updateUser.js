const constants = require('../../utils/constants');
const average = require('../../utils/average');
const userTokenCheck = require('../../utils/userTokenCheck');
// const getUserMarks = require('../../utils/getUserMarks');
const getSubjectsInfo = require('../../utils/getSubjectsInfo');
const { GetDbInfo, updateUserTransaction } = require('../../utils/dbQuery');
const StatusCodes = require('http-status-codes');

const updateUser = async (req, res) => {
  const token = req.body.token;
  const user = req.body;

  const response = await getUpdatedUser(user, token)
    .then((data) => {
      return data;
    })

  return response;

}

async function getUpdatedUser(userInfo, token) {
  const response = {
    user: {},
    status: StatusCodes.StatusCodes.BAD_REQUEST,
  };
  const dBName = constants.CONSTANTS.DATABASE === "Postgree" ? '"user"' : "[user]";

  const userId = await userTokenCheck(token);

  if (!userId) {
    return response;
  };

  const currentUser = await GetDbInfo(`SELECT * FROM ${dBName} WHERE userid = ${userId}`);

  if (currentUser[0]) {
    const userInfoToUpdate = {
      email: userInfo.email,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      Class: userInfo.Class,
      passwordhash: currentUser[0].passwordhash,
    }

    const transactionResponse = await updateUserTransaction(
      userId,
      userInfoToUpdate
    );

    if (transactionResponse) {
      const userSubjects = await getSubjectsInfo(currentUser[0].userid);

      let averageMarks = [];
      userSubjects.forEach(item => {
        averageMarks = [...averageMarks, +item.AverageMark]
      })

      response.user = {
        UserId: userId,
        Email: userInfo.email,
        FirstName: userInfo.firstname,
        LastName: userInfo.lastname,
        Class: userInfo.Class,
        AverageMark: average(averageMarks, constants.CONSTANTS.DIGITS),
        Subjects: userSubjects,
      };
      response.status = StatusCodes.StatusCodes.OK;
    } else {
      response.status = StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
    }

  }
  return response;
};

module.exports = updateUser;