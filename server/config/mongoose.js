const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString);
console.log(process.env.MONGODB_URI);

module.exports = {
    mongoose
}