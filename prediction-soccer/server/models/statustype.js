'use strict'

const mongoose = require('mongoose');

const statusTypeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
},
{
    timestamps: true
});

module.exports = mongoose.model('status_types', statusTypeSchema);