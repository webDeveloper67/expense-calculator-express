import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {signUp, clearErrors} from '../../actions/verify';

const SignUp = props => {
	const {setAlert, signUp, error, clearErrors, isAuth} = props;
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const {name, email, password, password2} = user;

	useEffect(
		() => {
			if (isAuth) {
				props.history.push('/home');
			}
			if (error === 'User already exists!') {
				setAlert(error, 'negative');
				clearErrors();
			}
		},
		[error, isAuth, props.history]
	);

	const handleOnChange = e => {
		setUser({...user, [e.target.name]: e.target.value});
	};

	const handleOnSubmit = e => {
		e.preventDefault();
		if (name === '' || email === '' || password === '') {
			setAlert('Please Enter All Fields', 'negative');
		} else if (password !== password2) {
			setAlert('Passwords Do Not Match', 'negative');
		} else {
			signUp({name, email, password});
		}
	};
	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={handleOnSubmit} className="ui form">
				<div>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={handleOnChange}
					/>
				</div>
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
				<div>
					<label htmlFor="password2">Confirm Password</label>
					<input
						type="password"
						name="password2"
						value={password2}
						onChange={handleOnChange}
					/>
				</div>
				<input type="submit" value="Sign Up" />
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
export default connect(mapStateToProps, {setAlert, signUp, clearErrors})(
	SignUp
);
