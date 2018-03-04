'use strict'

const mongoose = require('mongoose');

const tournamentgroupSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tournaments',
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('tournament_groups', tournamentgroupSchema);