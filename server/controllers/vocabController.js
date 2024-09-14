const express = require('express');
const Vocabulary = require('../models/Vocabulary');
const VocabularyList = require('../models/VocabularyList');

const getVocabList = async (req, res) => {
    try {
        const vocabList = await Vocabulary.find({user: req.user._id})
        res.status(200).json(vocabList);
    } catch {
        res.status(500).json({message: 'Server error'});
    }
};

const addVocab = async (req, res) => {
    const { word, partOfSpeech, definition, example } = req.body;
    // const userId = req.user.id; // Assuming req.user.id contains the user ID

    try {
        // Check if the required fields are provided
        if (!word || !partOfSpeech || !definition || !req.user.id) {
            return res.status(400).json({ message: 'Missing required arguments' });
        }

        // Check if the vocabulary already exists
        const vocab = await Vocabulary.findOne({ word });
        if (vocab) {
            return res.status(400).json({ message: 'Vocabulary already exists' });
        }

        // Create and save the new vocabulary
        const newVocab = new Vocabulary({
            word: String(word).trim().toLowerCase(),
            partOfSpeech: String(partOfSpeech).trim().toLowerCase(),
            definition: String(definition).trim().toLowerCase(),
            example: String(example).trim(),
            vocabList: req.user.userVocabList
        });
        
        // query
        const vocabList = await VocabularyList.findById(req.user.userVocabList);
        vocabList.vocabList.push(newVocab._id);
        
        await vocabList.save();
        await newVocab.save();

        // Return the newly created vocabulary
        res.status(201).json(newVocab);

    } catch (error) {
        console.error('Server error:', error); // Log error details for debugging
        returnres.status(500).json({ message: 'Server error' });
    }
};

const updateVocab = (req, res) => {
    const {word, partOfSpeech, definition, example} = req.body;


}

// Delete a vocabulary word
const deleteVocab = async (req, res) => {
    try {
        const vocab = await Vocabulary.findById(req.params.id);
        if (!vocab || vocab.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Vocabulary not found' });
        }
        await vocab.remove();
        res.status(200).json({ message: 'Vocabulary deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {getVocabList, addVocab, deleteVocab};