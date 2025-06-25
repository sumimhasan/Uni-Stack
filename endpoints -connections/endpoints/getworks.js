const express = require('express');
const { findDocuments } = require('./mongoHelper'); // Your helper module
const mongoose = require('mongoose');

const router = express.Router();

// Define the schema for a work item


// GET /works/:userId - Get all works for a user
router.get('/works/:userId', async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const works = await findDocuments('works', workSchema, { userId });
        return res.json({ works });
    } catch (err) {
        console.error('Error fetching works:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
