const express = require('express');
const { tokenMiddleware, loginHandler } = require('./authHandlers');
const { registerHandler } = require('./registerHandler');
const { getUserWorksHandler } = require('./workHandlers');

const router = express.Router();

// Auth routes
router.post('/login', tokenMiddleware, loginHandler);
router.post('/register', registerHandler);

// Work routes
router.get('/works/:userId', getUserWorksHandler);

module.exports = router;
