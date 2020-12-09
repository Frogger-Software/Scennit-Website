const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'photoapp',
    password: 'csc317',
    database: 'csc317db',
    //debug: true,
});

const promisePool = pool.promise();

module.exports = promisePool;