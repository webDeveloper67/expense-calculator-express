import {
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	USER_LOADED,
	VERIFY_ERROR,
	SIGNIN_SUCCESS,
	SIGNIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/verify');

		dispatch({
			type: USER_LOADED,
			payload: res.data // will be user
		});
	} catch (err) {
		dispatch({
			type: VERIFY_ERROR
		});
	}
};

export const signUp = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		const res = await axios.post('/api/users', formData, config);

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: res.data // res.data will be token
		});

		dispatch(loadUser());
	} catch (err) {
		dispatch({
			type: SIGNUP_FAIL,
			payload: err.response.data.msg
		});
	}
};

export const signIn = formData => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		const res = await axios.post('/api/verify', formData, config);

		dispatch({
			type: SIGNIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		dispatch({
			type: SIGNIN_FAIL,
			payload: err.response.data.msg
		});
	}
};

// Logout
export const logout = () => async dispatch => {
	dispatch({
		type: LOGOUT
	});
};

export const clearErrors = () => async dispatch => {
	dispatch({
		type: CLEAR_ERRORS
	});
};
