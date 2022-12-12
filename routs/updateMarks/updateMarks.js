const constants = require('../../utils/constants');
const average = require('../../utils/average');
const userTokenCheck = require('../../utils/userTokenCheck');
const getUserMarks = require('../../utils/getUserMarks');
const { GetDbInfo, updateMarksTransaction } = require('../../utils/dbQuery');
const StatusCodes = require('http-status-codes');

const updateMarks = async (req, res) => {
  const token = req.body.token;
  const subjectId = req.body.subjectId;
  const marks = req.body.marks;

  const response = await getMarksBySubjectId(subjectId, marks, token)
    .then((data) => {
      return data;
    })

  return response;

}

async function getMarksBySubjectId(subjectId, marks, token) {
  const response = {
    marksData: {},
    status: StatusCodes.StatusCodes.UNAUTHORIZED,
  };

  const userId = await userTokenCheck(token);

  if (!userId) {
    return response;
  };

  const subjectsDb = await GetDbInfo(`SELECT * FROM "subjects" WHERE id = ${subjectId}`);

  if (subjectsDb[0]) {

    const transactionResponse = await updateMarksTransaction(
      userId,
      subjectId,
      marks
    );

    if (transactionResponse) {
      const dbMarks = await getUserMarks(userId, subjectId);

      response.marksData = {
        SubjectId: subjectId,
        SubjectName: subjectsDb[0].name,
        AverageMark: average(marks, constants.CONSTANTS.DIGITS),
        Marks: dbMarks
      };
      response.status = StatusCodes.StatusCodes.OK;
    } else {
      response.status = StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
    }

  }
  return response;
};

module.exports = updateMarks;