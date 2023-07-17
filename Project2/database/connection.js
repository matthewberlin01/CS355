const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    debug: false,
    host: '127.0.0.1',
    port: 3306,
    database: 'mberlin_cs355fa22',
    user: 'mberlin_cs355fa22',
    password: 'be7339079'
});

module.exports = dbConnection;