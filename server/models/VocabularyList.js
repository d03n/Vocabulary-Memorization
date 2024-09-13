const mongoose = require('mongoose');

const schema = mongoose.Schema({
    vocabList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

schema.methods.addVocabList = function addVocabList(vocabId) {
    this.vocabList.add(vocabId);
}

module.export = mongoose.model('vocabList', schema);