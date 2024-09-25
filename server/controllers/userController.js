const User = require('../models/User');
const VocabList = require('../models/VocabularyList');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'User already exists!' });

        // db management
        
        user = new User({ username, email, password });

        const vocabList = new VocabList({user: user._id});
        vocabList.user = user._id;

        user.userVocabList = vocabList._id;
        
        await user.save();
        await vocabList.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: { id: user._id, username, email } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Login User
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const passwordStr = String(password).trim();
        console.log(username);

        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User does not exist!' });

        // Compare passwords
        const isMatch = await bcrypt.compare(passwordStr, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, username, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };
