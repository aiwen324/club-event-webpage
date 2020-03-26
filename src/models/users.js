const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // If accountType == 0, this is a normal user, else it is an admin
    accountType: {type: Number, default: 0},
    username: String,
    email: String,
    password: String,
    phoneNumber: String
});



const Users = mongoose.model('User', userSchema);

module.exports = { Users };