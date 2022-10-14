const constants = require('../utils/constants');
const average = require('../utils/average');
const StatusCodes = require('http-status-codes');

const updateMarks = (req, res) => {
  const token = req.body.token;
  const subjectId = req.body.subjectId;
  const marks = req.body.marks;
  const isRightToken = checkToken(token);

  constants.CONSTANTS.MOCK_MARKS[subjectId - 1].Marks = marks;

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
    response.marksData = {
      SubjectId: id,
      SubjectName: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].SubjectName,
      AverageMark: average(marks, constants.CONSTANTS.DIGITS),
      Marks: marks
    };
    response.status = StatusCodes.StatusCodes.OK;
  }
  return response;
};

module.exports = updateMarks;