const { Schema, model} = require('mongoose');

const contentSchema = new Schema({
    content: {
        type: String
    }
}, { timestamps: true });

module.exports = model('Content', contentSchema);