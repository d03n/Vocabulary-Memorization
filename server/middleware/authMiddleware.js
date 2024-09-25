const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(String(token), process.env.JWT_SECRET);
        console.log(decoded);
        // find by _id property then select exclude(-) password
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch(error) {
        console.log(error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = authMiddleware;