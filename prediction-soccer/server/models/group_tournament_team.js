'use strict'

const mongoose = require('mongoose');

const groupTournamentTeamSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups',
        required: true
    },
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
},
{
    timestamps: true
});

module.exports = mongoose.model('groups_tournaments_teams', groupTournamentTeamSchema);