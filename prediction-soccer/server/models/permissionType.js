'use strict'

const mongoose = require('mongoose');

const permissionTypeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true }
},
{
    timestamps: true
});

module.exports = mongoose.model('permissions_types', permissionTypeSchema);