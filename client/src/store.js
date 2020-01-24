import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// Set initial state
const initialState = {};

// Combine middleware into one object
const middleware = [thunk];

// Create store instance 
const store = createStore(
	rootReducer,
 	initialState,
  composeWithDevTools(applyMiddleware(...middleware))
 );

export default store;