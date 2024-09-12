const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const vocabRoutes = require('./routes/vocabRoutes');
const quizRoutes = require('./routes/quizRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin requests
app.use(express.json()); // Parse JSON request body

app.use('/api/users', userRoutes);
app.use('/api/vocab', vocabRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));

