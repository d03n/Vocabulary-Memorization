const Vocabulary = require('../models/Vocabulary');

const getQuiz = async (req, res) => {
    const vocabList = await Vocabulary.find({user: req.user._id});
    if (!vocabList) return res.status(400).json({message: 'no vocab'});

    
};