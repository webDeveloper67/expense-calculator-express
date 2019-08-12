const express = require('express');

const router = express.Router();

const {check, validationResult} = require('express-validator');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const config = require('config');

const User = require('../models/User');

// POST - api/users - Register a user - Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').isLength({min: 6})
	],
	async (req, res) => {
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(422).json({errors: errors.array()});
		}

		const {name, email, password} = req.body;
		try {
			let user = await User.findOne({email});

			if (user) {
				res.status(400).json({msg: 'User already exists!'});
			}

			user = new User({
				name,
				email,
				password
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

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

module.exports = router;
