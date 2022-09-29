const constants = require('../utils/constants');
const StatusCodes = require('http-status-codes');

const getUser = (req, res) => {
  const token = req;
  const responseData = getUserData(token);
  res.status(responseData.status).send(responseData.data);
}


function getUserData(token) {
  const response = {
    status: StatusCodes.StatusCodes.OK,
    data: {}
  }
  if (token !== constants.CONSTANTS.MOCK_TOKEN) {
    response.status = StatusCodes.StatusCodes.UNAUTHORIZED;
    return response;
  } else {
    response.data = {
      UserId: "1",
      Email: constants.CONSTANTS.MOCK_USER.Email,
      FirstName: "Светлана",
      LastName: "Полешук",
      Class: "1",
      Subjects: [
        { SubjectId: 1, SubjectName: "Математика", AverageMark: 8 },
        { SubjectId: 2, SubjectName: "Английский", AverageMark: 9 },
        { SubjectId: 3, SubjectName: "Русский язык", AverageMark: 8 },
        { SubjectId: 4, SubjectName: "Физкультура", AverageMark: 9 },
        { SubjectId: 5, SubjectName: "ИЗО", AverageMark: 10 },
      ],
    }
    return response;
  }
};

module.exports = getUser;