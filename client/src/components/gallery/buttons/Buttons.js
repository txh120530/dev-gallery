import React, {Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
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
				<div key={button._id.toString()}> <div dangerouslySetInnerHTML={{ __html: button.html }} /></div>
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