import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, verify: {isAuth}, ...rest}) => {
	return (
		<Route
			{...rest}
			render={props =>
				!isAuth ? <Redirect to="/" /> : <Component {...props} />}
		/>
	);
};

const mapStateToProps = state => {
	return {
		verify: state.verify
	};
};

export default connect(mapStateToProps)(PrivateRoute);
