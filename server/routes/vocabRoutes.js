const express = require('express');
const {getVocabList, addVocab, deleteVocab} = require('../controllers/vocabController');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getVocabList);

router.post('/', authMiddleware, addVocab);

// id of the vocab
router.delete('/:id', authMiddleware, deleteVocab);

module.exports = router;