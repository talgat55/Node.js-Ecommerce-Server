import mongoose from "mongoose"
import config from "./../config/config.json"

mongoose.connect(config.path);
var db = mongoose.connection;

db.on('error', function() {
    console.log('error occured from db');
});

db.once('open', function dbOpen() {
    console.log('successfully opened the db');
});

module.exports = db;