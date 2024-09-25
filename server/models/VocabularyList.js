const mongoose = require('mongoose');

const schema = mongoose.Schema({
    vocabList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary' }],
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('vocabList', schema);