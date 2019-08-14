import React, {useEffect, Fragment} from 'react';
import ExpenseItem from './ExpenseItem';
import {connect} from 'react-redux';
import {getExpenses} from '../../actions/expense';
import Spinner from '../layout/Spinner';

const Expenses = ({expense: {expenses}, getExpenses}) => {
	useEffect(() => {
		getExpenses();
		// eslint-disable-next-line
	}, []);
	return (
		<Fragment>
			{expenses !== null
				? <div>
						<div className="ui stackable four column grid">
							{expenses.map(expense =>
								<ExpenseItem key={expense._id} expense={expense} />
							)}
						</div>
						<div className="ui hidden divider" />
						<div>
							<button className="ui button red">
								Total Spending: ${' '}
								{expenses.reduce((acc, curr) => {
									return (acc += parseInt(curr.amount));
								}, 0)}
							</button>
						</div>
					</div>
				: <Spinner />}
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		expense: state.expense
	};
};

export default connect(mapStateToProps, {getExpenses})(Expenses);
