const constants = require('../utils/constants')

const getMarks = (req, res) => {
  const token = req.body.token;
  const subjectId = req.body.subjectId;
  const isRightSubjectId = checkSubjectId(subjectId);

  if (!isRightSubjectId) {
    const responseData = { message: "invalid subject id" };
    res.status(404).send(responseData);
  } else {
    const responseData = getMarksBySubjectId(subjectId, token);
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

function getMarksBySubjectId(id, token) {
  const statusOk = 200;
  const statusUnauthorized = 401;
  const response = {
    marksData: {
      SubjectId: id,
      SubjectName: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].SubjectName,
      AverageMark: constants.CONSTANTS.MOCK_SUBJECTS[id - 1].AverageMark,
      Marks: []
    },
    status: statusOk,
  };

  if (token === constants.CONSTANTS.MOCK_TOKEN) {
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
        return
    }
  } else {
    response.marksData = {};
    response.status = statusUnauthorized;
  }
  return response;
};

module.exports = getMarks;