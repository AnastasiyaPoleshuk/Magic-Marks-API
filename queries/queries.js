const fs = require('fs');
const path = require('path');
const { Client } = require('pg');



const getUserByDatabase = () => {
    const config = path.join(__dirname, '../utils/ca.crt');
    const client = new Client({
        connectionString: 'postgres://ikeuveifiydacx:cba5ff25e0483ec9cb63f9e4d0f0bda66f5ca6a83b201c08dba04074042850b9@ec2-176-34-215-248.eu-west-1.compute.amazonaws.com:5432/db?sslmode=require',
        ssl: {
            rejectUnauthorized: false,
            ca: fs.readFileSync(config).toString(),
        }
    });

    client.connect();

    client.query('SELECT * FROM "user" where userid=1', (err, res) => {
        if (err) throw err;

        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
    });
}

module.exports = getUserByDatabase;