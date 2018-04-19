'use strict'

const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    statusType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'status_types',
        required: true
    },
    isActive: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
},
{
    timestamps: true
});

module.exports = mongoose.model('status', statusSchema);