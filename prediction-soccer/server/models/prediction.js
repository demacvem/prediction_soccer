'use strict'

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'boards',
        required: true
    },
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matches',
        required: true
    },
    localGoals: { type: Number, required: true },
    visitorGoals: { type: Number, required: true },
    points: Number
},
{
    timestamps: true
});

module.exports = mongoose.model('predictions', boardSchema);