const express = require('express');
const { getQuiz } = require('../controllers/quizController')
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getQuiz);

module.exports = router;