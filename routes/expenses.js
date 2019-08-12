const express = require('express');
const router = express.Router();

// GET - api/expenses - Get specific user expenses - Private
router.get('/', (req, res) => {
	res.send('Get all user expenses');
});

module.exports = router;
