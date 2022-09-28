const constants = require('../utils/constants');
const StatusCodes = require('http-status-codes');

const getMarks = (req, res) => {
  const token = req.body.token;
  const subjectId = req.body.subjectId;
  const isRightToken = checkToken(token);

  if (!isRightToken) {
    const responseData = { message: "invalid token" };
    res.status(StatusCodes.StatusCodes.UNAUTHORIZED).send(responseData);
  } else {
    const responseData = getMarksBySubjectId(subjectId);
    res.status(responseData.status).send(responseData.marksData);
  }

}

function checkToken(token) {
  if (token === constants.CONSTANTS.MOCK_TOKEN) {
    return true;
  } else {
    return false;
  }
}

function getMarksBySubjectId(id) {
  const response = {
    marksData: {},
    status: StatusCodes.StatusCodes.UNAUTHORIZED,
  };

  if (id > 0 && id <= constants.CONSTANTS.MOCK_SUBJECTS.length) {
    response.marksData = {
      SubjectId: id,
      SubjectName: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].SubjectName,
      AverageMark: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].AverageMark,
      Marks: []
    }
    response.status = StatusCodes.StatusCodes.OK;

    switch (id) {
      case 1:
        response.marksData.Marks = [8, 9];
        break
      case 2:
        response.marksData.Marks = [9];
        break
      case 3:
        response.marksData.Marks = [8, 8, 8];
        break

      case 4:
        response.marksData.Marks = [9, 9, 9];
        break

      case 5:
        response.marksData.Marks = [10];
        break
      default:
        return {}
    }
  }

  return response;
};

module.exports = getMarks;