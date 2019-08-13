import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/verify';
import {FiLogOut} from 'react-icons/fi';

const Navbar = ({isAuth, user, logout}) => {
	const handleOnLogout = () => {
		logout();
	};

	const verifyLinks = (
		<Fragment>
			<Link className="ui item blue header">
				Hello: {user && user.name}
			</Link>
			<Link to="/about" className="item">
				About Us
			</Link>
			<Link to="/home" className="item">
				Home
			</Link>
			<div className="right menu">
				<a href="!#" className="item" onClick={handleOnLogout}>
					<FiLogOut />
					Logout
				</a>
			</div>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Link to="/signin" className="item">
				Sign In
			</Link>
			<Link to="/signup" className="item">
				Sign Up
			</Link>
		</Fragment>
	);
	return (
		<div className="ui menu">
			<div className="ui container">
				<Link to="/" className="header item">
					Expense App
				</Link>
				{isAuth ? verifyLinks : guestLinks}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAuth: state.verify.isAuth,
		user: state.verify.user
	};
};

export default connect(mapStateToProps, {logout})(Navbar);
