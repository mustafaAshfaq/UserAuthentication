var mongoose = require('mongoose');
require('dotenv').config();
const connectDb=async()=>{
    var dbURI = process.env.MONGOLAB_URI;
    await mongoose.connect(dbURI);
    // CONNECTION EVENTS

    mongoose.connection.on('connected', function () {

    console.log('Mongoose connected to ' + dbURI);

    });

    mongoose.connection.on('error', function (err) {

        console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {

        console.log('Mongoose disconnected');

    });
    //connect to db
    // BRING IN YOUR SCHEMAS & MODELS

    require('./users')

}
module.exports=connectDb;

