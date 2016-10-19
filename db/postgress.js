import config from "./../config/config.json"
import pg from "pg"

var configuration = {
    user: config.userdb ? config.userdb : "root", //env var: PGUSER 
    database: config.database ? config.database : "my_db", //env var: PGDATABASE 
    password: config.passworddb ? config.passworddb : "root", //env var: PGPASSWORD 
    port: config.port ? config.port : "5432", //env var: PGPORT 
    max: config.connections ? config.connections : "10", // max number of clients in the pool 
    idleTimeoutMillis: config.limittimeconnect ? config.limittimeconnect : "30000", // how long a client is allowed to remain idle before being closed 
};

var pool = new pg.Pool(configuration);
pool.connect(function(err, client, done) {
    if (err) {
        return console.error('error fetching client from pool', err);
    }
    /// some function
    /* client.query('SELECT $1::int AS number', ['1'], function(err, result) {
         //call `done()` to release the client back to the pool 
         done();

         if (err) {
             return console.error('error running query', err);
         }
         console.log(result.rows[0].number);
         //output: 1 
     });
     */
});

pool.on('error', function(err, client) {
    // if an error is encountered by a client while it sits idle in the pool 
    // the pool itself will emit an error event with both the error and 
    // the client which emitted the original error 
    // this is a rare occurrence but can happen if there is a network partition 
    // between your application and the database, the database restarts, etc. 
    // and so you might want to handle it and at least log it out 
    console.error('idle client error', err.message, err.stack)

    console.log("client " + client)
})
module.exports = pool;