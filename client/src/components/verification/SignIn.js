import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {signIn, clearErrors} from '../../actions/verify';
import {setAlert} from '../../actions/alert';

const SignIn = props => {
	const {signIn, setAlert, clearErrors, error, isAuth} = props;

	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	const {email, password} = user;

	useEffect(
		() => {
			if (isAuth) {
				props.history.push('/home');
			}
			if (error === 'Invalid Credentials') {
				setAlert(error, 'negative');
				clearErrors();
			}
		},
		// eslint-disable-next-line
		[error, isAuth, props.history]
	);

	const handleOnChange = e => {
		setUser({...user, [e.target.name]: e.target.value});
	};

	const handleOnSubmit = e => {
		e.preventDefault();
		if (email === '' || password === '') {
			setAlert('Please fill all the fields', 'negative');
		} else {
			signIn({email, password});
		}
	};
	return (
		<div>
			<h1>Sign In</h1>
			<form onSubmit={handleOnSubmit} className="ui form">
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={handleOnChange}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handleOnChange}
					/>
				</div>
				<div className="ui hidden divider" />
				<input type="submit" value="Sign In" className="ui purple button" />
			</form>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		error: state.verify.error,
		isAuth: state.verify.isAuth
	};
};

export default connect(mapStateToProps, {signIn, setAlert, clearErrors})(
	SignIn
);
