import {combineReducers} from 'redux';
import expense from './expense';
import verify from './verify';
import alert from './alert';

export default combineReducers({
	expense,
	verify,
	alert
});
