import React, { Fragment, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App-build.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Buttons from './components/gallery/buttons/Buttons';
import CreateButton from './components/button-forms/CreateButton';
import Gallery from './components/gallery/Gallery';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';

import PrivateRoute from './components/routing/PrivateRoute'

import setAuthToken from './utils/setAuthToken'

//Redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

if(localStorage.token){
	setAuthToken(localStorage.token);
}


const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

	return(
    <Provider store={store}>
		<Router> 
	   <Fragment>
	     <Navbar />
	     <Route exact path="/" component={Landing} />
	     <section className="container max-w-4xl">
	     <Alert />
	     		<Switch>
 			     	<Route exact path="/register" component={Register} />
	     	    <Route exact path="/login" component={Login} />
	     	    <PrivateRoute exact path="/dashboard" component={Dashboard} />
	     	    <PrivateRoute exact path="/create-profile" component={CreateProfile} />
	     	    <PrivateRoute exact path="/gallery" component={Gallery} />
	     	    <PrivateRoute path="/gallery/buttons" component={Buttons} />
	     	    <PrivateRoute path="/gallery/create-button" component={CreateButton} />
	     		</Switch>
	     </section>
	   </Fragment>
   </Router>
   </Provider>
 )}

export default App;
