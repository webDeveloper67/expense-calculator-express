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
	expenses: []
};

export default function(state = initialState, action) {
	const {type, payload} = action;

	switch (type) {
		case GET_EXPENSES:
			return {
				...state,
				expenses: payload,
				loading: false
			};
		default:
			return state;
	}
}
