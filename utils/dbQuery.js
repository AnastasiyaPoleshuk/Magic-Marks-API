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

module.exports = GetDbInfo;