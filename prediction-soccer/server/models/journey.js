'use strict'

const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    date: { type: Date, required: true },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tournaments',
        required: true
    },
    isActive: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false }
}, 
{
    timestamps: true
});

module.exports = mongoose.model('journeys', journeySchema);