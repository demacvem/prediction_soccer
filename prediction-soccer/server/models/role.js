'use strict'

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true }
},
{
    timestamps: true
});

module.exports = mongoose.model('roles', roleSchema);