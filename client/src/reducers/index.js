import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import button from './button';

// Combine all reducers from the different files into one

export default combineReducers({alert, auth, profile, button});