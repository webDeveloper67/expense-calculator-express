const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const verify = require('../middleware/verify');

const User = require('../models/User');
const Expense = require('../models/Expense');

// GET - api/expenses - Get specific user expenses - Private
router.get('/', verify, async (req, res) => {
	try {
		const expenses = await Expense.find({user: req.user.id}).sort({date: -1});

		res.json(expenses);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// POST - api/expenses - Add new expense - Private
router.post(
	'/',
	[
		verify,
		[
			check('charge', 'charge is required').exists(),
			check('amount', 'amount is required').exists()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({errors: errors.array()});
		}

		const {charge, amount, type} = req.body;

		try {
			const newExpense = new Expense({
				charge,
				amount,
				type,
				user: req.user.id
			});

			const expense = await newExpense.save();

			res.json(expense);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
