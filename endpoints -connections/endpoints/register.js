const { findDocumentOne, createDocument } = require('./mongoHelper'); // Replace with your actual helper filename
const userSchema = require('./userSchema');

// Handler for POST /register
async function registerHandler(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: 'Email and password are required.' });

    try {
        // Check if user already exists
        const existingUser = await findDocumentOne('users', userSchema.obj, { email });

        if (existingUser)
            return res.status(409).json({ error: 'User already exists.' });

        // Create new user
        const newUser = await createDocument('users', userSchema.obj, { email, password });

        return res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Server error.' });
    }
}

module.exports = {
    registerHandler
};
