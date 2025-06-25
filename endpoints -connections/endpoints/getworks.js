const mongoose = require('mongoose');
const { findDocuments } = require('./mongoHelper'); // Your helper module

// Handler for GET /works/:userId
async function getUserWorksHandler(req, res) {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        // If you have a schema to pass to findDocuments, add it here; else pass null or adjust helper
        const works = await findDocuments('works', null, { userId });
        return res.json({ works });
    } catch (err) {
        console.error('Error fetching works:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    getUserWorksHandler
};
