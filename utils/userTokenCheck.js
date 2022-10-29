const db = require('../queries/queries');

async function userTokenCheck(token) {
  const timeNow = new Date();
  await db.queryWithParams('DELETE FROM "login" WHERE expiration < $1', [timeNow]);

  const { rows: loginData } = await db.queryWithParams('SELECT * FROM "login" where "token" =$1', [token]);

  if (loginData[0]) {
    return loginData[0].userid;
  }
  return null;
}

module.exports = userTokenCheck;
