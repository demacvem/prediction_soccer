'use strict'

const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    logo: { type: String , required: true },
    order: { type: Number , required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: Date,
},
{
    timestamps: true
});

module.exports = mongoose.model('tournaments', tournamentSchema);