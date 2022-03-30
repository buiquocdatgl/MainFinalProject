const db = {};
const mongoose = require('mongoose');
// const User = require('../model/user');
const product = require('../model/product');

mongoose.Promise = global.Promise;

db.mongoose = mongoose;

db.Product = product; 

db.connect = async (dbConnectionUrl) => {
    try {
        await mongoose.connect(dbConnectionUrl, {useUnifiedTopology: true, useNewUrlParser: true});
        console.log('DB connected');
    } catch (error) {
       console.error(`Connecting error: ${error}`);
    }
}

module.exports = db;
