import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
	addExpense,
	clearCurrentExpense,
	updateExpense
} from '../../actions/expense';

const ExpenseForm = ({
	addExpense,
	expense: {current},
	clearCurrentExpense,
	updateExpense
}) => {
	const [expense, setExpense] = useState({
		charge: '',
		amount: '',
		type: 'personal'
	});

	const {charge, amount, type} = expense;

	const handleOnChange = e =>
		setExpense({...expense, [e.target.name]: e.target.value});

	const clearAll = () => {
		clearCurrentExpense();
	};

	useEffect(
		() => {
			if (current !== null) {
				setExpense(current);
			} else {
				setExpense({
					charge: '',
					amount: '',
					type: 'personal'
				});
			}
		},
		[current]
	);

	const handleOnSubmit = e => {
		e.preventDefault();
		if (current === null) {
			addExpense(expense);
		} else {
			updateExpense(expense);
			clearCurrentExpense();
		}
		setExpense({
			charge: '',
			amount: '',
			type: 'personal'
		});
	};

	return (
		<div>
			<form className="ui form" onSubmit={handleOnSubmit}>
				<h4 className="ui dividing header">Expenses Information</h4>
				<div className="field">
					<label htmlFor="charge">Charge</label>
					<input
						type="text"
						name="charge"
						value={charge}
						placeholder="e.g. charge"
						onChange={handleOnChange}
					/>
				</div>
				<div className="field">
					<label htmlFor="amount">Amount</label>
					<input
						type="text"
						name="amount"
						value={amount}
						placeholder="e.g. amount"
						onChange={handleOnChange}
					/>
				</div>
				<h4 className="ui dividing header">Expense Type</h4>
				<div className="field">
					<div className="ui radio checked">
						<input
							type="radio"
							name="type"
							value="personal"
							checked={type === 'personal'}
							onChange={handleOnChange}
						/>{' '}
						Personal
					</div>
				</div>
				<div className="field">
					<div className="ui radio checked">
						<input
							type="radio"
							name="type"
							value="family"
							checked={type === 'family'}
							onChange={handleOnChange}
						/>{' '}
						Family
					</div>
				</div>
				<div>
					<input
						className="ui violet button"
						type="submit"
						value={current ? 'Update Expense' : 'Add Expense'}
					/>
				</div>
				{current &&
					<div>
						<button className="ui grey button" onClick={clearAll}>
							Clear
						</button>
					</div>}
			</form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		expense: state.expense
	};
};

export default connect(mapStateToProps, {
	addExpense,
	clearCurrentExpense,
	updateExpense
})(ExpenseForm);
