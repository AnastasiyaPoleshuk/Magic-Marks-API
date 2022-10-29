const userTokenCheck = require('../utils/userTokenCheck');
const constants = require('../utils/constants');
const getUserMarks = require('../utils/getUserMarks');
const average = require('../utils/average');
const StatusCodes = require('http-status-codes');
const db = require('../queries/queries');

const getUser = async (req, res) => {
  if (!req) {
    return res.sendStatus(400);
  }

  const token = req.query.token;

  const response = await getUserData(token)
    .then((data) => {
      return data;
    })

  return response;
}


async function getUserData(token) {
  const response = {
    status: StatusCodes.StatusCodes.OK,
    data: {}
  }
  const userid = await userTokenCheck(token);

  if (!userid) {
    response.status = StatusCodes.StatusCodes.UNAUTHORIZED;
    return response;
  } else {
    const { rows: userdb } = await db.queryWithParams('SELECT * FROM "user" where userid=$1', [userid]);
    const userSubjects = await getSubjectsInfo(userdb[0].userid);

    let averageMarks = [];
    userSubjects.forEach(item => {
      averageMarks = [...averageMarks, +item.AverageMark]
    })

    response.data = {
      UserId: `${userdb[0].userid}`,
      Email: userdb[0].email,
      FirstName: userdb[0].firstname,
      LastName: userdb[0].lastname,
      Class: userdb[0].Class,
      AverageMark: average(averageMarks, constants.CONSTANTS.DIGITS),
      Subjects: userSubjects,
    }

    return response;
  }
};

async function getSubjectsInfo(userId) {
  let subjectsArr = [];
  const { rows: subjectsDb } = await db.query('SELECT * FROM "subjects"');

  for (const subjectItem of subjectsDb) {
    const subject = await createSubjectObject(userId, subjectItem)
    subjectsArr = [...subjectsArr, subject];
  }

  return subjectsArr;
}

async function createSubjectObject(userId, subjectItem) {
  const marks = await getUserMarks(userId, subjectItem.id);
  let subject = {
    SubjectId: +subjectItem.id,
    SubjectName: subjectItem.name,
    AverageMark: average(marks, constants.CONSTANTS.DIGITS)
  }
  return subject;
}

module.exports = getUser;