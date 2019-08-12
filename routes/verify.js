const express = require('express');
const router = express.Router();

// POST - api/verify - Verify user and get token - Public
router.post('/', (req, res) => {
	res.send('Get logged in user');
});

// GET - api/verify - Get logged in user - Private
router.get('/', (req, res) => {
	res.send('Login user');
});

module.exports = router;
