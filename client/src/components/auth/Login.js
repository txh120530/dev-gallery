import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'

const Login = props => {

	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	// Destructure from formData object
	const {email, password} = formData;


const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

const onSubmit = async e =>{
	e.preventDefault();
		console.log(formData);
}








	return (
		<Fragment>
			<h1 clasName="large text-primary"Sign Up></h1>
			<p className="lead">Sign in To Your Account</p>

			<form onSubmit={e => onSubmit(e)}>
				<input onChange={e => onChange(e)} required placeholder="Email Address" name="email" value={email} type="email"/>
				<input onChange={e => onChange(e)} required placeholder="Password" minLength="6" name="password" value={password} type="password"/>
				<input type="submit" value="Register" placeholder="Sign In"/>
			</form>
		</Fragment>
	)
}

Login.propTypes = {

}

export default Login