const constants = require('../utils/constants')

const getUser = (req, res) => {
  const token = req.body.token;
  const userId = createUserId(token);

  if (userId) {
    const userData = createUserData(userId)
    res.status(200).send(userData);
  } else {
    const responseData = { message: "Unauthorized" };
    res.status(401).send(responseData);
  }

}

function createUserId(token) {
  if (token === constants.CONSTANTS.MOCK_TOKEN) {
    const userId = 1;
    return userId;
  } else {
    return null;
  }
}

function createUserData(id) {
  return {
    UserId: id,
    Email: constants.CONSTANTS.MOCK_USER.Email,
    FirstName: "Светлана",
    LastName: "Полешук",
    Class: "1",
    Subjects: [
      { SubjectId: 1, SubjectName: "Метематика", AverageMark: 8 },
      { SubjectId: 2, SubjectName: "Английский", AverageMark: 9 },
      { SubjectId: 3, SubjectName: "Русский язык", AverageMark: 8 },
      { SubjectId: 4, SubjectName: "Фмзкультура", AverageMark: 9 },
      { SubjectId: 5, SubjectName: "ИЗО", AverageMark: 10 },
    ]
  }
};

module.exports = getUser;