'use strict'

const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    journey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'journeys',
        required: true
    },
    _date: { type: Date, required: true },
    _time: { type: String, required: true },
    localTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams',
        required: true
    },
    visitorTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams',
        required: true
    },
    localGoals: { type: Number, default: 0 },
    visitorGoals: { type: Number, default: 0 },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'status',
        required: true
    },
    deleted: { type: Boolean, default: false}
},
{
    timestamps: true
});

module.exports = mongoose.model('matches', matchSchema);