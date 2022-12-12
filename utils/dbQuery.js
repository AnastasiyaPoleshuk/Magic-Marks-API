const db = require('../queries/queries');
const MSDb = require('../queries/MSQueries');
const constants = require('../utils/constants');

async function GetDbInfo(queryString) {
  let result = {};

  if (constants.CONSTANTS.DATABASE === "Postgree") {
    const { rows } = await db.query(queryString);
    result = rows[0];
  } else {
    const rows = await MSDb.msQuery(queryString);
    rows ? result = rows : result = null;
  }

  return result;
}

async function updateMarksTransaction(userId, subjectId, marks) {
  let result = {};
  if (constants.CONSTANTS.DATABASE === "Postgree") {
    const resp = await db.updateMarksInDB(userId, subjectId, marks);
    result = resp;
  } else {
    const resp = await MSDb.updateMarksInMSDb(userId, subjectId, marks);
    result = resp;
  }
  return result;
}
async function updateUserTransaction(userId, userInfo) {

  let result = {};
  if (constants.CONSTANTS.DATABASE !== "Postgree") {
    const resp = await MSDb.updateUserInMSDb(userId, userInfo);
    result = resp;
  }
  return result;
}

module.exports = { GetDbInfo, updateMarksTransaction, updateUserTransaction };