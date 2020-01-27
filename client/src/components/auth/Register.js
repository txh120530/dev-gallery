import React, {Fragment, useState} from 'react'
import { Redirect } from 'react-router';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';

const Register = (props) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	// Destructure from formData object
	const {name, email, password, password2} = formData;


const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

const onSubmit = async e =>{
	e.preventDefault();

	if(password !== password2){
		props.setAlert('Passwords do not Match', 'warning');
	}

	else{
		props.register({name, email, password});
	}
}

// Redirect if logged in
if (props.isAuthenticated){
	return <Redirect to="/gallery" />
}

	return (
		<Fragment>
			<h1 className="text-4xl font-bold text-center text-blue-500">Sign Up</h1>
			<p className="text-2l font-bold text-center text-blue-500">Create Your Account</p>

			<form onSubmit={e => onSubmit(e)}>
				<input  onChange={e => onChange(e)} required placeholder="Name" name="name" value={name} type="text"/>
				<input  onChange={e => onChange(e)} required placeholder="Email Address" name="email" value={email} type="email"/>
				<input  onChange={e => onChange(e)} required placeholder="Password" minLength="6" name="password" value={password} type="password"/>
				<input  onChange={e => onChange(e)} required placeholder="Re-enter Password" minLength="6" name="password2" value={password2} type="password"/>
				<input className="btn btn-blue" type="submit" value="Register" placeholder="Submit"/>
			</form>
		</Fragment>
	)
}

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
		isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);