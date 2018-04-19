'use strict'

const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    code: { type: String, required: true },
    url: String,
    icon: String ,
    padre: { type: Number, required: true },
    isActive: Boolean,
    deleted: { type: Boolean, default: false}
},
{
    timestamps: true
});

module.exports = mongoose.model('menus', menuSchema);