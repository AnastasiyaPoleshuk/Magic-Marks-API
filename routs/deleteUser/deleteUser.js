const constants = require('../../utils/constants');
const userTokenCheck = require('../../utils/userTokenCheck');
const { GetDbInfo } = require('../../utils/dbQuery');
const StatusCodes = require('http-status-codes');

const deleteUser = async (req, res) => {
  const token = req.token;


  const response = await deleteUserInDb(token)
    .then((data) => {
      return data;
    })

  return response;

};

async function deleteUserInDb(token) {
  const response = {
    message: "BAD REQUEST",
    status: StatusCodes.StatusCodes.BAD_REQUEST,
  };
  const dBName = constants.CONSTANTS.DATABASE === "Postgree" ? '"user"' : "[user]";

  const userId = await userTokenCheck(token);
  if (!userId) {
    return response;
  };

  const deletedUser = await GetDbInfo(`DELETE FROM ${dBName} WHERE userid = ${userId}`);
  const deletedMarks = await GetDbInfo(`DELETE FROM "marks" WHERE userid = ${userId}`);

  if (deletedUser === null && deletedMarks === null) {
    response.message = "User was successfully deleted";
    response.status = StatusCodes.StatusCodes.OK;
  }

  return response;
};

module.exports = deleteUser;