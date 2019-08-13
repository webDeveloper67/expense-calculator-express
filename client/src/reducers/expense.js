import {
	GET_EXPENSES,
	EXPENSE_ERROR,
	ADD_EXPENSE,
	DELETE_EXPENSE,
	UPDATE_EXPENSE,
	SET_CURRENT,
	CLEAR_CURRENT
} from '../actions/types';

const initialState = {
	expenses: [],
	current: null,
	error: null
};

export default function(state = initialState, action) {
	const {type, payload} = action;

	switch (type) {
		case GET_EXPENSES:
			return {
				...state,
				expenses: payload
			};
		case ADD_EXPENSE:
			return {
				...state,
				expenses: [payload, ...state.expenses]
			};
		case EXPENSE_ERROR:
			return {
				...state,
				error: payload
			};
		case DELETE_EXPENSE:
			return {
				...state,
				expenses: state.expenses.filter(expense => expense._id !== payload)
			};
		case UPDATE_EXPENSE:
			return {
				...state,
				expenses: state.expenses.map(
					expense => (expense._id === payload._id ? payload : expense)
				)
			};
		case SET_CURRENT:
			return {
				...state,
				current: payload
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		default:
			return state;
	}
}
