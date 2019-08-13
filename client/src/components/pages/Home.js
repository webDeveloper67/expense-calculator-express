import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/verify';
import Expenses from '../expenses/Expenses';
import ExpenseForm from '../expenses/ExpenseForm';

const Home = ({loadUser}) => {
	useEffect(() => {
		loadUser();
	}, []);
	return (
		<div>
			<ExpenseForm />
			<Expenses />
		</div>
	);
};

export default connect(null, {loadUser})(Home);
