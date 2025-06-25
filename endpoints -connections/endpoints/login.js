const jwt = require('jsonwebtoken');
const { findDocumentOneSQL } = require('./your-sql-db-file'); // Update with actual filename
const JWT_SECRET = 'your_secret_key'; // Replace with a secure secret key

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

// Handler for login route
async function loginHandler(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }

    try {
        // Replace 'userSchema' with your actual schema if needed or remove it if not used
        const user = await findDocumentOneSQL('users', null, { email });

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
}

module.exports = {
    tokenMiddleware,
    loginHandler
};
