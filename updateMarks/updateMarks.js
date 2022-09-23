const constants = require('../utils/constants')

const updateMarks = (req, res) => {
  const token = req.body.token;
  const subjectId = req.body.subjectId;
  const marks = req.body.marks;
  const isRightSubjectId = checkSubjectId(subjectId);

  if (!isRightSubjectId) {
    const responseData = { message: "invalid subject id" };
    res.status(404).send(responseData);
  } else {
    const responseData = getMarksBySubjectId(subjectId, marks, token);
    res.status(responseData.status).send(responseData.marksData);
  }

}

function checkSubjectId(id) {
  if (id > 0 && id <= constants.CONSTANTS.MOCK_SUBJECTS.length) {
    return true;
  } else {
    return false;
  }
}

function getMarksBySubjectId(id, marks, token) {
  const statusOk = 200;
  const statusUnauthorized = 401;
  const response = {
    marksData: {},
    status: statusUnauthorized,
  };
  if (token === constants.CONSTANTS.MOCK_TOKEN) {
    const averageMark = calcAverageMark(marks);
    response.marksData = {
      SubjectId: id,
      SubjectName: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].SubjectName,
      AverageMark: averageMark,
      Marks: marks
    };
    response.status = statusOk;
  }
  return response;
};

function calcAverageMark(marks) {
  let sumOfMarks = 0;
  const digits = 1;

  marks.forEach(mark => {
    sumOfMarks += mark;
  });

  const averageMark = sumOfMarks / marks.length;

  return averageMark.toFixed(digits);
}

module.exports = updateMarks;