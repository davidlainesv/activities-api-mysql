var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "4321",
    database: "app",
    debug: false
});

module.exports = pool