import {
	GET_EXPENSES,
	EXPENSE_ERROR,
	ADD_EXPENSE,
	DELETE_EXPENSE,
	UPDATE_EXPENSE,
	SET_CURRENT,
	CLEAR_CURRENT
} from './types';

import axios from 'axios';

// Get Contacts
export const getExpenses = () => async dispatch => {
	try {
		const res = await axios.get('/api/expenses');

		dispatch({
			type: GET_EXPENSES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: EXPENSE_ERROR,
			payload: err.response.msg
		});
	}
};
