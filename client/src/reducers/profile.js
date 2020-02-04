import {
	GET_PROFILE,
	GET_PROFILES,
	UPDATE_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE
} from '../actions/types';


const initialState = {
  profiles: [],
  profile: null,
  reposts: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

	switch(type){
		case UPDATE_PROFILE:
		case GET_PROFILE:
			return{
				...state,
				profile: payload,
				loading: false
			}

		case GET_PROFILES:
			return{
				...state,
				profile: payload,
				loading: false
			}
		case PROFILE_ERROR:
			return{
				...state,
				loading: false,
				error: payload
			}
		case CLEAR_PROFILE:
			return{
				...state,
				loading: false,
				profile: null
			}
		default:
			return state;
	}

}