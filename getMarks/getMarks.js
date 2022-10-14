const constants = require('../utils/constants');
const average = require('../utils/average');
const StatusCodes = require('http-status-codes');

const getMarks = (req, res) => {
  const token = req.token;
  const subjectId = +req.subjectId;
  const isRightToken = checkToken(token);

  if (!isRightToken) {
    res.status(StatusCodes.StatusCodes.UNAUTHORIZED).send({});
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
    const marks = constants.CONSTANTS.MOCK_MARKS[id - 1].Marks;

    response.marksData = {
      SubjectId: id,
      SubjectName: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].SubjectName,
      AverageMark: average(marks, constants.CONSTANTS.DIGITS),
      Marks: marks,
    }
    response.status = StatusCodes.StatusCodes.OK;

  }
  return response;
};

module.exports = getMarks;