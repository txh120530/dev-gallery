import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../actions/profile'

const CreateProfile = ({createProfile, getCurrentProfile, profile: {profile, loading}, history}) => {
	const [formData, setFormData] = useState({
		company: '',
		website: '',
		location: '',
		skills: '',
		bio: '',
		status: '',
		githubusername: '',
		youtube: '',
		facebook: '',
		twitter: '',
		instagram: '',
		linkedin: ''
	});

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

		// Destructure from formData object
	const {company,website,location,bio,status,githubusername,youtube,facebook,twitter,instagram,linkedin, skills} = formData;
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


const onSubmit = async e =>{
	e.preventDefault();
	createProfile(formData, history);
}

useEffect(() => {
		getCurrentProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getCurrentProfile]);


	return loading && profile === null ? (
		<Redirect to='/dashboard' />
		) : (
		<Fragment>
			<h1 className="text-4xl font-bold text-center text-blue-500">Create Profile</h1>
			<p className="text-2l font-bold text-center text-blue-500">Create Your Profile</p>

			<form onSubmit={e => onSubmit(e)}>
				<select name='status' value={status} onChange={e => onChange(e)}>
						<option value='0'>* Select Professional Status</option>
						<option value='Developer'>Developer</option>
						<option value='Junior Developer'>Junior Developer</option>
						<option value='Senior Developer'>Senior Developer</option>
						<option value='Manager'>Manager</option>
						<option value='Student or Learning'>Student or Learning</option>
						<option value='Instructor'>Instructor or Teacher</option>
						<option value='Intern'>Intern</option>
						<option value='Other'>Other</option>
					</select>
					<small className='text-xs'>
						Give us an idea of where you are at in your career
					</small>

				<input  onChange={e => onChange(e)} placeholder="Website" name="website" value={website} type="text"/>
				<small className="text-xs">Could be your own or a company website</small>
				<input  onChange={e => onChange(e)} placeholder="Your current Location" name="location" value={location} type="text"/>
				<small className="text-xs">City and State (eg Dallas, TX) is recommended.</small>
				<textarea  onChange={e => onChange(e)} placeholder="Bio" name="bio" value={bio} type="text"/>
				<small className="text-xs">Write a little about yourself</small>
				<input
						type='text'
						placeholder='* Skills'
						name='skills'
						value={skills}
						onChange={e => onChange(e)}
					/>
					<small className='text-xs'>
						Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
					</small>
				<input  onChange={e => onChange(e)} placeholder="Your github profile" name="githubusername" value={githubusername} type="text"/>
				
				<div><button type="button" onClick={() => toggleSocialInputs(!displaySocialInputs)} className="btn btn-light">Add Social Network Links</button></div>
				{displaySocialInputs && <Fragment>
				<input  onChange={e => onChange(e)} placeholder="Youtube" name="youtube" value={youtube} type="text"/>
				<input  onChange={e => onChange(e)} placeholder="Facebook" name="facebook" value={facebook} type="text"/>
				<input  onChange={e => onChange(e)} placeholder="Twitter" name="twitter" value={twitter} type="text"/>
				<input  onChange={e => onChange(e)} placeholder="Instagram" name="instagram" value={instagram} type="text"/>
				<input  onChange={e => onChange(e)} placeholder="Linkedin" name="linkedin" value={linkedin} type="text"/>
				</Fragment>}



				<input className="btn btn-blue" type="submit" value="Submit" placeholder="Submit"/>
			</form>
		</Fragment>
	)
}

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
	profile: state.profile
});


export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(CreateProfile)
);

