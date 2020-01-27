import React from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux';
import {removeAlert} from '../../actions/alert';


const Alert = (props) => {

	const onClick = (e, id) =>{
		const removeIndex = props.alerts.map(alert => alert.id.toString()).indexOf(id);
		props.removeAlert(props.alerts[removeIndex].id);
	}


	return props.alerts !== null &&
	props.alerts.length >0 &&
	props.alerts.map((alert) =>{
		return(
			<div onClick={e => onClick(e, alert.id)} key={alert.id} className={`alert alert-${alert.alertType}`}>
				{alert.msg}

				<span className="icon icon-close">x</span>
			</div>
		);
	});
}

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,

}

const mapStateToProps = state => ({
	alerts: state.alert
})

export default connect(mapStateToProps, { removeAlert })(Alert);