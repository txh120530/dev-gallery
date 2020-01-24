import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import {connect} from 'react-redux';
import {setAlert} from '../../actions/alert';

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
		console.log(formData);
	}
}

	return (
		<Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">Create Your Account</p>

			<form onSubmit={e => onSubmit(e)}>
				<input onChange={e => onChange(e)} required placeholder="Name" name="name" value={name} type="text"/>
				<input onChange={e => onChange(e)} required placeholder="Email Address" name="email" value={email} type="email"/>
				<input onChange={e => onChange(e)} required placeholder="Password" minLength="6" name="password" value={password} type="password"/>
				<input onChange={e => onChange(e)} required placeholder="Re-enter Password" minLength="6" name="password2" value={password2} type="password"/>
				<input type="submit" value="Register" placeholder="Submit"/>
			</form>
		</Fragment>
	)
}

Register.propTypes = {
	setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register);