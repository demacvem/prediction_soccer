'use strict'

const mongoose = require('mongoose');

const roleuserSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('roles_users', roleuserSchema);