import React from 'react';
import {connect} from 'react-redux';
import {
	deleteExpense,
	setCurrentExpense,
	clearCurrentExpense
} from '../../actions/expense';

const ExpenseItem = ({
	expense,
	deleteExpense,
	setCurrentExpense,
	clearCurrentExpense
}) => {
	const {charge, amount, type, _id} = expense;

	const handleOnDelete = () => {
		deleteExpense(_id);
		clearCurrentExpense();
	};
	return (
		<div className="ui cards">
			<div className="card">
				<div className="content">
					<div className="content">
						{amount &&
							<span className="right floated">
								${amount}
							</span>}
						{charge &&
							<strong>
								{' '}<span>{charge}</span>
							</strong>}
					</div>
					<div className="ui divided selection list">
						<div
							className={
								'ui horizontal label ' + (type === 'family' ? 'red' : 'purple')
							}
						>
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</div>
					</div>
					<div className="extra content">
						<div className="ui two buttons">
							<div
								className="ui basic green button"
								onClick={() => setCurrentExpense(expense)}
							>
								Edit
							</div>
							<div className="ui basic red button" onClick={handleOnDelete}>
								Delete
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(null, {
	deleteExpense,
	setCurrentExpense,
	clearCurrentExpense
})(ExpenseItem);
