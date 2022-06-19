const { Schema, model} = require('mongoose');

const contentSchema = new Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = new model('Content', contentSchema);