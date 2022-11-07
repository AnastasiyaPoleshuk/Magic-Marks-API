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

module.exports = {
  queryWithParams: (text, params) => pool.query(text, params),
  query: (text) => pool.query(text),
}