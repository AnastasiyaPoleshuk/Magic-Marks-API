const { GetDbInfo } = require('./dbQuery');
const getUserMarks = require('./getUserMarks');
const average = require('./average');
const constants = require('./constants');

async function getSubjectsInfo(userId) {
  let subjectsArr = [];
  const subjectsDb = await GetDbInfo('SELECT * FROM "subjects"');
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

module.exports = getSubjectsInfo;
