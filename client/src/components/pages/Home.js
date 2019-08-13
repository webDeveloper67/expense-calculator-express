import React from 'react';
import Expenses from '../expenses/Expenses';
import ExpenseForm from '../expenses/ExpenseForm';

const Home = ({loadUser}) => {
	return (
		<div>
			<ExpenseForm />
			<Expenses />
		</div>
	);
};

export default Home;
