const sql = require('mssql');

const MSconfig = {
  user: 'Uladzimir',
  password: 'qwerty123',
  server: 'nastya-education.database.windows.net',
  database: 'nastya-education',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}

const MSQuery = async (queryString) => {
  const res = await sql.connect(MSconfig)
    .then(pool => {
      return pool.request().query(queryString);
    })
    .then(result => {
      let res;
      result.recordset ? res = result.recordset : res = null;
      return res;
    })
    .catch(err => {
      console.error(err);
      return;
    });
  return res;
}

const updateMarksInMSDb = async (userId, subjectId, marks) => {
  let isSuccess = false;

  const res = await sql.connect(MSconfig)
  try {
    const transaction = new sql.Transaction(res);
    await transaction.begin();
    const request = new sql.Request(transaction);
    await request.query(`DELETE FROM "marks" WHERE userid = ${userId} AND subjectid=${subjectId};`);

    for (const mark of marks) {
      await request.query(`INSERT INTO "marks" VALUES(${userId}, ${subjectId}, ${mark})`)
    }
    
    await transaction.commit()

  } catch (err) {
    transaction.rollback();
    console.log("Error", err);
    return isSuccess;
  }
  return isSuccess = true;
}

module.exports = {
  msQuery: (queryString) => MSQuery(queryString),
  updateMarksInMSDb: (userId, subjectId, mark) => updateMarksInMSDb(userId, subjectId, mark),
}