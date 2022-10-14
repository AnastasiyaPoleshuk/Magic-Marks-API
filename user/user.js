const constants = require('../utils/constants');
const average = require('../utils/average');
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
    const marks = constants.CONSTANTS.MOCK_MARKS[0].Marks.concat(
      constants.CONSTANTS.MOCK_MARKS[1].Marks,
      constants.CONSTANTS.MOCK_MARKS[2].Marks,
      constants.CONSTANTS.MOCK_MARKS[3].Marks,
      constants.CONSTANTS.MOCK_MARKS[4].Marks,
    );
    response.data = {
      UserId: "1",
      Email: constants.CONSTANTS.MOCK_USER.Email,
      FirstName: "Светлана",
      LastName: "Полешук",
      Class: "1",
      AverageMark: average(marks, constants.CONSTANTS.DIGITS),
      Subjects: [
        { SubjectId: 1, SubjectName: "Математика", AverageMark: average(constants.CONSTANTS.MOCK_MARKS[0].Marks, constants.CONSTANTS.DIGITS) },
        { SubjectId: 2, SubjectName: "Английский", AverageMark: average(constants.CONSTANTS.MOCK_MARKS[1].Marks, constants.CONSTANTS.DIGITS) },
        { SubjectId: 3, SubjectName: "Русский язык", AverageMark: average(constants.CONSTANTS.MOCK_MARKS[2].Marks, constants.CONSTANTS.DIGITS) },
        { SubjectId: 4, SubjectName: "Физкультура", AverageMark: average(constants.CONSTANTS.MOCK_MARKS[3].Marks, constants.CONSTANTS.DIGITS) },
        { SubjectId: 5, SubjectName: "ИЗО", AverageMark: average(constants.CONSTANTS.MOCK_MARKS[4].Marks, constants.CONSTANTS.DIGITS) },
      ],
    }

    return response;
  }
};

module.exports = getUser;