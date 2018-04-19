'use strict'

const mongoose = require('mongoose');

const userTypeTournamentTeamSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
},
{
    timestamps: true
});

module.exports = mongoose.model('users_types', userTypeTournamentTeamSchema);