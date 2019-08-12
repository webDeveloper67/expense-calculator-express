const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	charge: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	type: {
		type: String,
		default: 'personal'
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('expense', ExpenseSchema);
