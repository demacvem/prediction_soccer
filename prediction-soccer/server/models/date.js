'use strict'

const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tournaments',
        required: true
    }
});

module.exports = mongoose.model('dates', dateSchema);