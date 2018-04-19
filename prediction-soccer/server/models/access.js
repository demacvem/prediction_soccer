'use strict'

const mongoose = require('mongoose');

const accessSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles',
        required: true
    },
    permission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permissions',
        required: true
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menus',
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('accesses', accessSchema);