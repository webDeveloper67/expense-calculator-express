import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {getExpenses} from '../../actions/expense';

const Expenses = ({expense: {expenses}, getExpenses}) => {
	useEffect(() => {
		getExpenses();
	}, []);
	return (
		<div className="ui container">
			{expenses.map(expense =>
				<h3>
					{expense.charge}
				</h3>
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
