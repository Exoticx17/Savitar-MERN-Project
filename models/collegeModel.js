const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    itags: {
        type: Array,
        required: true,
        enmum: ["computer", "finance", "manufacturing", "agriculture", "medical", "education", "defense", "energy", "entertainment","law"]
    }
},{timestamps: true})

const College = mongoose.model('College', collegeSchema)
module.exports = College;