'use strict'

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tournaments',
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams',
        required: true
    },
    matchesPlayed: { type: Number, default: 0 },
    matchesWon: { type: Number, default: 0 },
    matchesTied: { type: Number, default: 0 },
    matchesLost: { type: Number, default: 0 },
    favorGoals: { type: Number, default: 0 },
    againtsGoals: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    position: { type: Number, default: 0 }
},
{
    timestamps: true
});

module.exports = mongoose.model('ratings', ratingSchema);