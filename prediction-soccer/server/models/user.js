'use strict'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String, 
        unique: true, 
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true, select: false},
    displayName: { type: String, required: true },
    avatar: String,
    userType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users_types',
        required: true
    },
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date,
    isActive: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('users', userSchema);