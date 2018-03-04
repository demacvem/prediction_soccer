'use strict'

const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    permissionType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permissions_types',
        required: true
    },
    isActive: { type: Boolean, default: true }
},
{
    timestamps: true
});

module.exports = mongoose.model('permissions', permissionSchema);