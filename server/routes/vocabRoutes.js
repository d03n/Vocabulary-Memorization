const express = require('express');
const {getVocabList, addVocab, updateVocab, deleteVocab} = require('../controllers/vocabController');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getVocabList);

router.post('/', authMiddleware, addVocab);

router.post('/:id', authMiddleware, updateVocab);

router.delete('/:id', authMiddleware, deleteVocab);

module.exports = router;