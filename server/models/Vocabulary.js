const mongoose = require('mongoose');

// Vocabulary schema
const vocabSchema = new mongoose.Schema({
    word: { type: String, required: true },
    partOfSpeech: { type: {type: String, required: true}, subtype: {type: String, required: false}},
    definition: { type: String, required: true },
    example: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Link to user
});

module.exports = mongoose.model('Vocabulary', vocabSchema);