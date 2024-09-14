const express = require('express');
const Vocabulary = require('../models/Vocabulary');
const VocabularyList = require('../models/VocabularyList');

const getVocabList = async (req, res) => {
    try {
        const vocabList = await Vocabulary.find({vocabList: req.user.userVocabList});
        res.status(200).json(vocabList);
    } catch(err) {
        console.log(err);
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

const updateVocab = async (req, res) => {
    try {
        const { word, partOfSpeech, definition, example } = req.body;

        // Build an update object with only non-null fields
        const updateFields = {};
        
        if (word != null) updateFields.word = word;
        if (partOfSpeech != null) updateFields.partOfSpeech = partOfSpeech;
        if (definition != null) updateFields.definition = definition;
        if (example != null) updateFields.example = example;


        // Update vocabulary document
        const updatedVocabulary = await Vocabulary.findOneAndUpdate(
            { _id: req.params.id, vocabList: req.user.userVocabList },  // Find vocabulary by ID
            { $set: updateFields },   // Only update non-null fields
            { new: true }             // Return the updated document
        );

        if (!updatedVocabulary) {
            return res.status(404).json({ message: "Vocabulary not found" });
        }

        res.status(200).json(updatedVocabulary);

    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Server error" });
    }
};

// Delete a vocabulary word
const deleteVocab = async (req, res) => {
    try {
        const vocab = await Vocabulary.findById(req.params.id);
        console.log(vocab.vocabList.toString());
        if (!vocab || vocab.vocabList.toString() != req.user.userVocabList) {
            return res.status(404).json({ message: 'Vocabulary not found' });
        }
        await Vocabulary.deleteOne({ _id: req.params.id, vocabList: req.user.userVocabList });
        res.status(200).json({ message: 'Vocabulary deleted' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {getVocabList, addVocab, updateVocab, deleteVocab};