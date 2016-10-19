import config from "./../config/config.json"
import mysql from "mysql"

var pool = mysql.createPool({
    host: 'example.org',
    user: config.userdb ? config.userdb : "root",
    password: config.passworddb ? config.passworddb : "root",
    connectionLimit: config.connections ? config.connections : "10",
    port: config.port ? config.port : "5432",
    connectTimeout: config.limittimeconnect ? config.limittimeconnect : "30000",
    database: config.database ? config.database : "my_db"
});

pool.getConnection(function(err, connection) {

    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
    // connected! (unless `err` is set) 
});

module.exports = pool;