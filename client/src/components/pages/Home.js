import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/verify';
import Expenses from '../expenses/Expenses';

const Home = ({loadUser}) => {
	useEffect(() => {
		loadUser();
	}, []);
	return (
		<div>
			<Expenses />
		</div>
	);
};

export default connect(null, {loadUser})(Home);
