'use strict'

const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    logo: { type: String, required: true },
    isActive: Boolean
});

module.exports = mongoose.model('leagues', leagueSchema);