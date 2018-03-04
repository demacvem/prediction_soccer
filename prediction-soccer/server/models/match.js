'use strict'

const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dates',
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
    tournamentgroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tournament_groups',
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

module.exports = mongoose.model('matches', matchSchema);