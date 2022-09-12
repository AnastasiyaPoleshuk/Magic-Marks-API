const constants = require('../utils/constants')

const getMarks = (req, res) => {
  const token = req.body.token;
  const subjectId = req.body.subjectId;
  const userId = getUserId(token);
  const isRightSubjectId = checkSubjectId(subjectId);

  if (!isRightSubjectId) {
    const responseData = { message: "invalid subject id" };
    res.status(404).send(responseData);
  }

  if (userId) {
    const marksData = getMarksBySubjectId(subjectId);
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

function getMarksBySubjectId(id) {
  let marksData = {
    SubjectId: id,
    SubjectName: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].SubjectName,
    AverageMark: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].AverageMark,
  };

  switch (id) {
    case 1:
      marksData.Marks = [8, 9];
      break
    case 2:
      marksData.Marks = [9];
      break
    case 3:
      marksData.Marks = [8, 8, 8];
      break

    case 4:
      marksData.Marks = [9, 9, 9];
      break

    case 5:
      marksData.Marks = [10];
      break
    default:
      return
  }
  return marksData;
};

module.exports = getMarks;