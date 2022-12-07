const moment = require('moment');
const GetDbInfo = require('../utils/dbQuery');
const constants = require('../utils/constants');

async function userTokenCheck(token) {
  let timeNow;

  if (constants.CONSTANTS.DATABASE === "Postgree"){
    timeNow = new Date();
  } else {
    timeNow = 
     `DATETIMEFROMPARTS(
        ${ moment().year() },
        ${ moment().month() },
        ${ moment().date() },
        ${ moment().hour() },
        ${ moment().minute() },
        ${ moment().seconds() },
        ${ moment().milliseconds() }
      )`;
  }
  await GetDbInfo(`DELETE FROM "login" WHERE expiration < ${timeNow}`);

  const loginData = await GetDbInfo(`SELECT * FROM "login" WHERE "token" = '${token}'`);

  if (loginData[0]) {
    return loginData[0].userid;
  }
  return null;
}

module.exports = userTokenCheck;
