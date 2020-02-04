import React, {Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Style from 'style-it';
import ReactHtmlParser from 'react-html-parser'; 
import store from '../../../store';


import { getButtons } from '../../../actions/button';

const Buttons = (props) =>{
	  useEffect(() => {
    store.dispatch(getButtons());
  }, []);







	return props.buttons.loading ? (
		<Fragment><h1 className="text-4xl font-bold text-center text-blue-500 py-5">Button Gallery</h1>	<p>Loading...</p></Fragment>
	) : (
		<Fragment>
			<h1 className="text-4xl font-bold text-center text-blue-500 py-5">Button Gallery</h1>

			{props.buttons.buttons.map(button => (
        <div className="text-center">
          <h2 className="text-2l font-bold text-blue-400">{button.title}</h2>
          {button.username ? <p>By: {button.username}</p> : null }
          {console.log(button.user)}
          {Style.it(button.css,
           <div key={button._id.toString()}> {ReactHtmlParser (button.html)}</div>
          )}
      </div>
      ))}
		</Fragment>
	) 


}


Buttons.propTypes = {
	getButtons: PropTypes.func.isRequired,
  buttons: PropTypes.object,
}

const mapStateToProps = state => ({
  buttons: state.button
})

export default connect(mapStateToProps, { getButtons })(Buttons)