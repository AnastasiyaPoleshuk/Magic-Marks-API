const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const config = path.join(__dirname, '../utils/ca.crt');
const pool = new Pool({
  connectionString: 'postgres://ikeuveifiydacx:cba5ff25e0483ec9cb63f9e4d0f0bda66f5ca6a83b201c08dba04074042850b9@ec2-176-34-215-248.eu-west-1.compute.amazonaws.com:5432/d10dt4qftsl1as',
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(config).toString(),
  }
});

const transaction = async (userId, subjectId, marks) => {
  const client = await pool.connect();
  let isSuccess = false;

  try {
    await client.query('BEGIN');

    const queryDeleteText = 'DELETE FROM "marks" WHERE userid = $1 AND subjectid=$2;';
    await client.query(queryDeleteText, [userId, subjectId]);

    const queryInsertText = 'INSERT INTO "marks" VALUES($1, $2, $3)';
    for (const mark of marks) {
      await client.query(queryInsertText, [userId, subjectId, mark])
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    return isSuccess;
  } finally {
    client.release();
  }
  return isSuccess = true;
}

module.exports = {
  queryWithParams: (text, params) => pool.query(text, params),
  query: (text) => pool.query(text),
  transaction: (userId, subjectId, mark) => transaction(userId, subjectId, mark),
}