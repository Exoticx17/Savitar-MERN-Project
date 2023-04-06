const { Integer } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    computer: {
        type: Number,
        default: 0
    },
    finance: {
        type: Number,
        default: 0
    },
    manufacturing: {
        type: Number,
        default: 0
    },
    agriculture: {
        type: Number,
        default: 0
    },
    medical: {
        type: Number,
        default: 0
    },
    education: {
        type: Number,
        default: 0
    },
    defense: {
        type: Number,
        default: 0
    },
    energy: {
        type: Number,
        default: 0
    },
    entertainment: {
        type: Number,
        default: 0
    },
    law: {
        type: Number,
        default: 0
    },
},{timestamps: true})

const Vote = mongoose.model('Vote', voteSchema)
module.exports = Vote;