import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile'

import Spinner from '../layout/Spinner'

const Dashboard = ({getCurrentProfile, auth: {user}, profile: {profile, loading}}) => {
	useEffect(()  => {
		getCurrentProfile();
	}, []);


	return loading && profile === null ? <Spinner /> : <Fragment>
		<h1>Dashboard</h1>
		<h2>Welcome {user && user.name }!</h2>
		{profile !== null ? <Fragment>has</Fragment> : <Fragment><p>You have not yet created a profile.</p> <Link to="/create-profile" className="btn btn-blue">Create a Profile</Link></Fragment>}
	</Fragment>;
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)