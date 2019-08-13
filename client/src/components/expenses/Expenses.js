import React, {useEffect} from 'react';
import ExpenseItem from './ExpenseItem';
import {connect} from 'react-redux';
import {getExpenses} from '../../actions/expense';

const Expenses = ({expense: {expenses}, getExpenses}) => {
	useEffect(() => {
		getExpenses();
		// eslint-disable-next-line
	}, []);
	return (
		<div className="ui container">
			{expenses.map(expense =>
				<ExpenseItem key={expense._id} expense={expense} />
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		expense: state.expense
	};
};

export default connect(mapStateToProps, {getExpenses})(Expenses);
