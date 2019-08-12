const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const config = require('config');

const verify = require('../middleware/verify');

const User = require('../models/User');

// POST - api/verify - Verify user and get token - Public
router.post(
	'/',
	[
		check('email', 'email is required').isEmail(),
		check('password', 'password is required').exists()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({errors: errors.array()});
		}

		const {email, password} = req.body;

		try {
			let user = await User.findOne({email});

			if (!user) {
				return res.status(400).json({msg: 'Invalid Credentials'});
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({msg: 'Invalid Credentials'});
			}

			// Send back to user
			jwt.sign(
				{user: {id: user.id}},
				config.get('jwtSecret'),
				{
					expiresIn: 3600000
				},
				(err, token) => {
					if (err) throw err;
					res.json({token});
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// GET - api/verify - Get logged in user - Private
router.get('/', verify, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
