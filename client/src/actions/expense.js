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

// Add Expense
export const addExpense = expense => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.post('/api/expenses', expense, config);

		dispatch({
			type: ADD_EXPENSE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: EXPENSE_ERROR,
			payload: err.response.msg
		});
	}
};

// Get Expense
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

// Delete Expense
export const deleteExpense = id => async dispatch => {
	try {
		await axios.delete(`/api/expenses/${id}`);

		dispatch({
			type: DELETE_EXPENSE,
			payload: id
		});
	} catch (err) {
		dispatch({
			type: EXPENSE_ERROR,
			payload: err.response.msg
		});
	}
};

// Update Expense
export const updateExpense = expense => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	try {
		const res = await axios.put(
			`/api/expenses/${expense._id}`,
			expense,
			config
		);

		dispatch({
			type: UPDATE_EXPENSE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: EXPENSE_ERROR,
			payload: err.response.msg
		});
	}
};

// Set Current Expense
export const setCurrentExpense = expense => async dispatch => {
	dispatch({
		type: SET_CURRENT,
		payload: expense
	});
};

// Clear Current Expense
export const clearCurrentExpense = () => async dispatch => {
	dispatch({
		type: CLEAR_CURRENT
	});
};
