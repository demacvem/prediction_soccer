'use strict'

const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    logo: { type: String , required: true },
    order: { type: Number , required: true },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'countries',
        required: true
    },
    isActive: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
},
{
    timestamps: true
});

module.exports = mongoose.model('tournaments', tournamentSchema);