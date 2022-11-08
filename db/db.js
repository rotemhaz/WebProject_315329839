const mysql = require('mysql2');
const dbConfig = require('./db.configuration.js');

//connect to the db
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.db
});

connection.connect(err => {
    if (err) {
        console.log("There was a problem to connect to the DB", err);
        throw err;
    }

    console.log("Suucessufly connected to the DB");

});


module.exports = connection;