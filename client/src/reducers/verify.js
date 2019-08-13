import {
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	USER_LOADED,
	VERIFY_ERROR,
	SIGNIN_SUCCESS,
	SIGNIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuth: null,
	loading: true,
	user: null,
	error: null
};

export default function(state = initialState, action) {
	const {type, payload} = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuth: true,
				loading: false,
				user: payload
			};
		case SIGNUP_SUCCESS:
		case SIGNIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuth: true,
				loading: false
			};
		case SIGNUP_FAIL:
		case VERIFY_ERROR:
		case SIGNIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuth: false,
				loading: false,
				user: null,
				error: payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
}
