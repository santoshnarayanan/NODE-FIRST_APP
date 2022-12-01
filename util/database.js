const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'santosh',
    database:'node-complete',
    password:'Password123!@#'
});

module.exports = pool.promise();