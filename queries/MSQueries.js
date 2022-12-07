const sql = require('mssql');

const MSconfig = {
  user: 'Uladzimir',
  password: 'qwerty123!',
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

module.exports = {
  msQuery: (queryString) => MSQuery(queryString),
}