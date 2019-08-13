import React from 'react';
import {connect} from 'react-redux';
import {MdWarning} from 'react-icons/md';

const Alert = ({alerts}) => {
	return (
		alerts.length > 0 &&
		alerts.map(alert =>
			<div key={alert.id} className={`ui message ${alert.type}`}>
				<MdWarning /> {alert.msg}
			</div>
		)
	);
};

const mapStateToProps = state => {
	return {
		alerts: state.alert
	};
};

export default connect(mapStateToProps)(Alert);
