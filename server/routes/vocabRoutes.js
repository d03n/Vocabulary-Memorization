const express = require('express');
const {getVocabList, addVocab} = require('../controllers/vocabController');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getVocabList);

router.post('/', authMiddleware, addVocab);

router.delete('/:id');

module.exports = router;