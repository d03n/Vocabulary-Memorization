const Vocabulary = require('../models/Vocabulary');

const getQuiz = async (req, res) => {
    try {
        const vocabs = await Vocabulary.aggregate([
            {$match: {vocabList: req.user.userVocabList}},
            {$sample: { size: 4 }}
        ]);
        
        res.status(200).json(vocabs);

    } catch(err) {
        console.log(err);
        return res.status(400).json({message: "Server error"});
    }

    
};

module.exports = { getQuiz };