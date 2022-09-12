const constants = require('../utils/constants')

const updateMarks = (req, res) => {
  const token = req.body.token;
  const subjectId = req.body.subjectId;
  const marks = req.body.marks;
  const userId = getUserId(token);
  const isRightSubjectId = checkSubjectId(subjectId);

  if (!isRightSubjectId) {
    const responseData = { message: "invalid subject id" };
    res.status(404).send(responseData);
  }

  if (userId) {
    const marksData = getMarksBySubjectId(subjectId, marks);
    res.status(200).send(marksData);
  } else {
    const responseData = { message: "Unauthorized" };
    res.status(401).send(responseData);
  }

}

function getUserId(token) {
  if (token === constants.CONSTANTS.MOCK_TOKEN) {
    const userId = 1;
    return userId;
  } else {
    return null;
  }
}

function checkSubjectId(id) {
  if (id > 0 && id <= constants.CONSTANTS.MOCK_SUBJECTS.length) {
    return true;
  } else {
    return false;
  }
}

function getMarksBySubjectId(id, marks) {
  const averageMark = calcAverageMark(marks);
  const marksData = {
    SubjectId: id,
    SubjectName: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].SubjectName,
    AverageMark: averageMark,
    Marks: marks
  };

  return marksData;
};

function calcAverageMark(marks) {
  let sumOfMarks = 0;

  marks.forEach(mark => {
    sumOfMarks += mark;
  });

  const averageMark = sumOfMarks / marks.length;

  return averageMark;
}

module.exports = updateMarks;