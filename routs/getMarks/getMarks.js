const constants = require('../../utils/constants');
const average = require('../../utils/average');
const userTokenCheck = require('../../utils/userTokenCheck');
const getUserMarks = require('../../utils/getUserMarks');
const StatusCodes = require('http-status-codes');
const { GetDbInfo } = require('../../utils/dbQuery');

const getMarks = async (req, res) => {
  const token = req.token;
  const subjectId = +req.subjectId;
  const response = await getMarksBySubjectId(subjectId, token)
    .then((data) => {
      return data;
    })

  return response;
}

async function getMarksBySubjectId(SubjectId, token) {
  const response = {
    marksData: {},
    status: StatusCodes.StatusCodes.UNAUTHORIZED,
  };

  const userId = await userTokenCheck(token);

  if (!userId) {
    return response;
  };

  const subjectsDb = await GetDbInfo(`SELECT * FROM "subjects" WHERE id = ${SubjectId}`);

  if (subjectsDb[0]) {
    const marks = await getUserMarks(userId, SubjectId);

    response.marksData = {
      SubjectId: SubjectId,
      SubjectName: subjectsDb[0].name,
      AverageMark: average(marks, constants.CONSTANTS.DIGITS),
      Marks: marks,
    }
    response.status = StatusCodes.StatusCodes.OK;
  }


  return response;
};

module.exports = getMarks;