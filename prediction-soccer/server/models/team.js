'use strict'

const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    logo: { type: String, required: true },
    initials: { type: String, required: true },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'leagues',
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('teams', teamSchema);