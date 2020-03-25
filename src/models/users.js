const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accountType: Number,
    username: String,
    email: String,
    password: String,
    phoneNumber: Number
});



const Users = mongoose.model('Restaurant', userSchema);

module.exports = { Users };