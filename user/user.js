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
        { SubjectId: 1, SubjectName: "Математика", AverageMark: average(1) },
        { SubjectId: 2, SubjectName: "Английский", AverageMark: average(2) },
        { SubjectId: 3, SubjectName: "Русский язык", AverageMark: average(3) },
        { SubjectId: 4, SubjectName: "Физкультура", AverageMark: average(4) },
        { SubjectId: 5, SubjectName: "ИЗО", AverageMark: average(5) },
      ],
    }
    
    return response;
  }
};

function average(id) {
  const marks = constants.CONSTANTS.MOCK_MARKS[id - 1].Marks;
  const average = marks.reduce((prev, curr) => prev + curr) / marks.length;
  return average.toFixed(constants.CONSTANTS.DIGITS)
}

module.exports = getUser;