const mongoose = require('mongoose');
const { Schema, model } = mongoose

const bcrypt = require("bcryptjs");

const ShemaUser = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true,
    }
})

ShemaUser.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
ShemaUser.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User',ShemaUser )