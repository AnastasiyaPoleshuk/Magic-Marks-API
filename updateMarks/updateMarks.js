const constants = require('../utils/constants');
const StatusCodes = require('http-status-codes');

const updateMarks = (req, res) => {
  const token = req.body.token;
  const subjectId = req.body.subjectId;
  const marks = req.body.marks;
  const isRightToken = checkToken(token);

  if (!isRightToken) {
    const responseData = { message: "invalid token" };
    res.status(404).send(responseData);
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
    const digits = 1;
    const average = marks.reduce((prev, curr) => prev + curr) / marks.length;
    response.marksData = {
      SubjectId: id,
      SubjectName: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].SubjectName,
      AverageMark: average.toFixed(digits),
      Marks: marks
    };
    response.status = StatusCodes.StatusCodes.OK;
  }
  return response;
};

module.exports = updateMarks;