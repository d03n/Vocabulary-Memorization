const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    vocabLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary' }]
});

// middleware function
// Pre-save hook to hash password before saving ( before use model.save() )
userSchema.pre('save', async function (next) {
    // if the password hasn't been modified (e.g. when updating other field of user), skip hashing process
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);
