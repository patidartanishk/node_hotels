const mongoose = require('mongoose');

// Define the mongodb connection url
const mongoURL = 'mongodb://localhost:27017/hotel' // replace "mydatabase" with hotels (database name)

// set mongodb connection
mongoose.connect(mongoURL);

// get the default connection
// mongoose maintain a default connection object represting the mongodb connection
const db = mongoose.connection;

//define event listeners for database  connection
db.on('connected' , () => {
    console.log('connected to mongodb server');
});
db.on('error' , (err) => {
    console.log('mongodb connection error' , err);
});
db.on('disconnected' , () => {
    console.log('mongodb disconnected');
});

// export the  database connection
module.exports = db;