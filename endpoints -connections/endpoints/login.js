const jwt = require('jsonwebtoken');
const express = require('express');
const { findDocumentOneSQL } = require('./your-sql-db-file'); // Update with actual filename
const { DataTypes } = require('sequelize');

const router = express.Router();
const JWT_SECRET = 'your_secret_key'; // Replace with a secure secret key

// Schema for user table (example)

// Middleware to check for JWT token
async function tokenMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return next(); // No token, continue to login attempt
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return res.json({ message: 'Already authenticated via token', user: decoded });
    } catch (err) {
        console.warn('Invalid token:', err.message);
        next(); // Invalid token, continue to login attempt
    }
}

// Login route
router.post('/login', tokenMiddleware, async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    try {
        const user = await findDocumentOneSQL('users', userSchema, { email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Replace this with proper hashed password check in production
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
