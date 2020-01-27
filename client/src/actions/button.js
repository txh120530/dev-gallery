import axios from 'axios';


import {
	GET_BUTTON,
	GET_BUTTONS,
	BUTTON_ERROR
} from './types'



// Load Button
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