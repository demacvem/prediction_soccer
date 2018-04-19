'use strict'

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'status',
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('boards', boardSchema);