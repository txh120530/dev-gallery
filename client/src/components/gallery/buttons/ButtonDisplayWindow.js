import React, {Fragment, useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { confirmAlert } from 'react-confirm-alert';
import Style from 'style-it';
import ReactHtmlParser from 'react-html-parser'; 

import 'react-confirm-alert/src/react-confirm-alert.css';
import store from '../../../store';

import { getButton,deleteButton } from '../../../actions/button';

const ButtonDisplayWindow = (props, {button}) => {

  const onDeleteButton = (e, id) => {
    const options = {
      title: 'Are you sure?',
      message: 'You want to delete this button? (This is permanent!)',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            console.log("Yes");
            await deleteButton(id);
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


  return(
      <div className="text-center shadow-md my-2 mx-2 p-6 relative bg-gray-100">
        {
          props.auth.loading ? (
            null
          ) : (props.auth.user._id.toString() === props.button.user || props.auth.user.roles.includes('admin') || props.auth.user.roles.includes('editor') ? <div className="module-buttons"><Link to={`/gallery/edit-button/${props.button._id}`} params={props.button._id}><i className='icon-pencil'></i></Link> <Link to='' onClick={e => onDeleteButton(e, props.button._id)}><i className='icon-plus'></i></Link></div> : null)
        }
        <h2 className="text-2l font-bold text-blue-400">{props.button.title}</h2>
        {props.button.username ? <p>By: {props.button.username}</p> : null }
        {Style.it(props.button.css,
         <div key={props.button._id.toString()}> {ReactHtmlParser (props.button.html)}</div>
        )}
        <div class="flex items-center justify-around text-xs">
          <CopyToClipboard onCopy={() => this.setState({copied: true})} text={props.button.html}><span className="cursor-pointer text-blue-400">(Copy HTML)</span></CopyToClipboard> 
          <CopyToClipboard onCopy={() => this.setState({copied: true})} text={props.button.css}><span className="cursor-pointer text-blue-400">(Copy CSS)</span></CopyToClipboard>
        </div>
    </div>
  )
}



ButtonDisplayWindow.propTypes = {
  deleteButton: PropTypes.func.isRequired,
  buttons: PropTypes.object,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  buttons: state.button,
  auth: state.auth
})

export default connect(mapStateToProps, { deleteButton })(ButtonDisplayWindow)