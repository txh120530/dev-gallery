import axios from 'axios';
import { setAlert } from './alert';


import {
	GET_PROFILE,
	GET_PROFILES,
  UPDATE_PROFILE,
	PROFILE_ERROR
} from './types'


// Load Profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({

      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


export const createProfile = (formData, history, edit=false) => async dispatch => {
  const config = {
       headers: {
      'Content-Type': 'application/json'
    } 
  };


  try {
    const res = await axios.post('/api/profile/',  formData, config);
    dispatch({

      type: UPDATE_PROFILE,
      payload: res.data
    });


    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

     if (!edit) {
      history.push('/dashboard');
    }

  } catch (err) {

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'warning')));
    }


    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const updateProfile = ({status, skills, company, website, location, bio, githubusername, youtube, facebook, twitter, instagram, linkedin}) => async dispatch => {
  const config = {
       headers: {
      'Content-Type': 'application/json'
    } 
  };

  const body = JSON.stringify({status, skills, company, website, location, bio, githubusername, youtube, facebook, twitter, instagram, linkedin});

  try {
    const res = await axios.post('/api/profile/',  body, config);
    dispatch({

      type: UPDATE_PROFILE,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}