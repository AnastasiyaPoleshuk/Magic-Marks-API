const db = require('../queries/queries')

const getUserMarks = async (userId, subjectId) => {
  let marksArr = [];
  const { rows: marks } = await db.queryWithParams('SELECT * FROM marks where userid = $1 and subjectid = $2', [userId, subjectId]);
  marks.forEach(mark => {
    marksArr = [...marksArr, +mark.marks];
  })
  return marksArr;
};

module.exports = getUserMarks;