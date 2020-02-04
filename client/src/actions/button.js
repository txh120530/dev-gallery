import axios from 'axios';
import { setAlert } from './alert';


import {
	GET_BUTTON,
	GET_BUTTONS,
  UPDATE_BUTTON,
	BUTTON_ERROR
} from './types'



// Load Buttons
export const getButtons = () => async dispatch => {
    try {
    const res = await axios.get(`/api/buttons/`);
    dispatch({
      type: GET_BUTTONS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: BUTTON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



export const createButton = (formData, history, edit=false) => async dispatch => {
  const config = {
       headers: {
      'Content-Type': 'application/json'
    } 
  };


  try {
    const res = await axios.post('/api/buttons/',  formData, config);
    dispatch({

      type: UPDATE_BUTTON,
      payload: res.data
    });


    dispatch(setAlert(edit ? 'Button Updated' : 'Button Created', 'success'))

     if (!edit) {
      history.push('/gallery/buttons');
    }

  } catch (err) {
    dispatch({
      type: BUTTON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}



// Load Button
export const getButton = (id) => async dispatch => {
    try {
    const res = await axios.get(`/api/buttons/${id}`);
    dispatch({
      type: GET_BUTTON,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: BUTTON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};