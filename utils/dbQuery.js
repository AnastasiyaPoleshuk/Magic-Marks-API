const db = require('../queries/queries');
const MSDb = require('../queries/MSQueries');
const constants = require('../utils/constants');

async function GetDbInfo(queryString, ...args) {
  let result = {};
  let isTransaction = false;
  
  args.length !== 0 ? isTransaction = true : null;

  if (isTransaction) {
    const isSuccess = updateMarksTransaction(args[0], args[1], args[2]);
    return isSuccess;
  }

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

module.exports = GetDbInfo;