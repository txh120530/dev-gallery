import React, {Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Style from 'style-it';
import ReactHtmlParser from 'react-html-parser'; 
import { confirmAlert } from 'react-confirm-alert';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ButtonDashboard from './ButtonDashboard'
import ButtonDisplayWindow from './ButtonDisplayWindow'
import Spinner from '../../layout/Spinner'
import store from '../../../store';
import { getButtons, deleteButton } from '../../../actions/button';

const Buttons = (props) =>{
	  useEffect(() => {
    store.dispatch(getButtons());
  }, []);

    const onDeleteButton = (e, id) => {
      const options = {
        title: 'Are you sure?',
        message: 'You want to delete this button? (This is permanent!)',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              console.log("Yes");
              await store.dispatch(deleteButton(id));
              store.dispatch(getButtons());
            }
          },
          {
            label: 'No'
          }
        ],
        childrenElement: () => <div />,
        closeOnEscape: true,
        closeOnClickOutside: true,
        willUnmount: () => {},
        onClickOutside: () => {},
        onKeypressEscape: () => {}
      };
       
      e.preventDefault();
      confirmAlert(options);
    };





	return props.buttons.loading ? (
		<Fragment><h1 className="text-4xl font-bold text-center text-blue-500 py-5">Button Gallery</h1>	
    <ButtonDashboard />
    <Spinner />
    </Fragment>
	) : (
		<Fragment>
			<h1 className="text-4xl font-bold text-center text-blue-500 py-5">Button Gallery</h1>

        <ButtonDashboard />

       <div className=" flex flex-wrap space-around">
			{props.buttons.buttons.map(button => (
        <ButtonDisplayWindow button={button}></ButtonDisplayWindow>
      ))}
      </div>
		</Fragment>
	) 


}


Buttons.propTypes = {
	getButtons: PropTypes.func.isRequired,
  deleteButton: PropTypes.func.isRequired,
  buttons: PropTypes.object
}

const mapStateToProps = state => ({
  buttons: state.button
})

export default connect(mapStateToProps, { getButtons, deleteButton })(Buttons)