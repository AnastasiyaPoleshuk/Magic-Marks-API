const constants = require('../utils/constants');
const StatusCodes = require('http-status-codes');

const updateMarks = (req, res) => {
  const token = req.body.token;
  const subjectId = req.body.subjectId;
  const marks = req.body.marks;
  const isRightToken = checkToken(token);

  if (!isRightToken) {
    res.status(StatusCodes.StatusCodes.UNAUTHORIZED).send({});
  } else {
    const responseData = getMarksBySubjectId(subjectId, marks);
    res.status(responseData.status).send(responseData.marksData);
  }

}

function checkToken(token) {
  if (token !== constants.CONSTANTS.MOCK_TOKEN) {
    return false;
  }
  return true;
}

function getMarksBySubjectId(id, marks) {
  const response = {
    marksData: {},
    status: StatusCodes.StatusCodes.UNAUTHORIZED,
  };
  if (id > 0 && id <= constants.CONSTANTS.MOCK_SUBJECTS.length) {
    const average = marks.reduce((prev, curr) => prev + curr) / marks.length;
    response.marksData = {
      SubjectId: id,
      SubjectName: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].SubjectName,
      AverageMark: average.toFixed(constants.CONSTANTS.DIGITS),
      Marks: marks
    };
    response.status = StatusCodes.StatusCodes.OK;
  }
  return response;
};

module.exports = updateMarks;