import React, {Fragment, useState} from 'react'
import { Redirect } from 'react-router';
import PropTypes from 'prop-types'

import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';
import {login} from '../../actions/auth';

const Login = (props) => {

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	// Destructure from formData object
	const {email, password} = formData;


const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

const onSubmit = async e =>{
	e.preventDefault();
	props.login({email, password});
}

// Redirect if logged in
if (props.isAuthenticated){
	return <Redirect to="/gallery/buttons" />
}






	return (
		<Fragment>
			<h1 className="text-4xl font-bold text-center text-blue-500">Sign In</h1>
			<p className="text-2l font-bold text-center text-blue-500">Sign in To Your Account</p>

			<form onSubmit={e => onSubmit(e)}>
				<input onChange={e => onChange(e)} required placeholder="Email Address" name="email" value={email} type="email"/>
				<input onChange={e => onChange(e)} required placeholder="Password" minLength="6" name="password" value={password} type="password"/>
				<input className="btn btn-blue" type="submit" value="Log In"/>
			</form>
		</Fragment>
	)
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, login })(Login)