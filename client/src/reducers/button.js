import {
	GET_BUTTON,
	GET_BUTTONS,
	BUTTON_ERROR
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
		default:
			return state;
	}

}