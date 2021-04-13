import {
	GET_BUTTON,
	GET_BUTTONS,
	UPDATE_BUTTON,
	DELETE_BUTTON,
	BUTTON_ERROR,
	CLEAR_BUTTON
} from '../actions/types'




const initialState = {
  buttons: [],
  button: null,
  loading: true,
  error: {}
};


export default function(state = initialState, action) {
  const { type, payload } = action;

	switch(type){
		case UPDATE_BUTTON:
		case GET_BUTTON:
			return{
				...state,
				button: payload,
				loading: false
			}
		case GET_BUTTONS:
			return{
				...state,
				buttons: payload,
				loading: false
			}
		case BUTTON_ERROR:
			return{
				...state,
				loading: false,
				error: payload
			}
		case DELETE_BUTTON:
		case CLEAR_BUTTON:
			return{
				...state,
				loading: false,
				buttons: [],
				button: null
			}
		default:
			return state;
	}

}