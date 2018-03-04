'use strict'

const mongoose = require('mongoose');

const tournamentteamSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    tournamentgroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tournament_groups',
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

module.exports = mongoose.model('tournament_teams', tournamentteamSchema);