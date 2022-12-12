const { GetDbInfo } = require('../utils/dbQuery');

const getUserMarks = async (userId, subjectId) => {
  let marksArr = [];
  const marks = await GetDbInfo(`SELECT * FROM marks WHERE userid = ${userId} and subjectid = ${subjectId}`);
  marks.forEach(mark => {
    marksArr = [...marksArr, +mark.marks];
  })
  return marksArr;
};

module.exports = getUserMarks;