'use strict'

const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    isActive: Boolean
});

module.exports = mongoose.model('status', statusSchema);