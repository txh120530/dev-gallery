import React, {Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Style from 'style-it';
import ReactHtmlParser from 'react-html-parser'; 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ButtonDashboard from './ButtonDashboard'
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
        <div className="text-center shadow-md my-2 mx-2 p-6 relative bg-gray-100">
          {
            props.auth.loading ? (
              null
            ) : (props.auth.user._id.toString() === button.user || props.auth.user.roles.includes('admin') || props.auth.user.roles.includes('editor') ? <div className="module-buttons"><Link to={`/gallery/edit-button/${button._id}`} params={button._id}><i className='icon-pencil'></i></Link> <Link to='' onClick={e => onDeleteButton(e, button._id)}><i className='icon-plus'></i></Link></div> : null)
          }
          <h2 className="text-2l font-bold text-blue-400">{button.title}</h2>
          {button.username ? <p>By: {button.username}</p> : null }
          {Style.it(button.css,
           <div key={button._id.toString()}> {ReactHtmlParser (button.html)}</div>
          )}
      </div>
      ))}
      </div>
		</Fragment>
	) 


}


Buttons.propTypes = {
	getButtons: PropTypes.func.isRequired,
  deleteButton: PropTypes.func.isRequired,
  buttons: PropTypes.object,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  buttons: state.button,
  auth: state.auth
})

export default connect(mapStateToProps, { getButtons, deleteButton })(Buttons)