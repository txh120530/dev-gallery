import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { createButton } from '../../actions/button'

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";

import Style from 'style-it';
import ReactHtmlParser from 'react-html-parser'; 

const CreateButton = ({createButton, button: {button, loading}, history, user}) => {
	const [formData, setFormData] = useState({
		title: '',
		username: '',
		html: "<a href='#' class='btn'>Sample Text</a>\n<a href='#' class='btn'>Sample Text</a>",
		css: ".btn{background-color: red; display: inline-block; color: #fff; padding: 10px; text-align: center; margin: 10px;}\n.btn-alt{background-color: green}"
	});


		// Destructure from formData object
	const {title, html, css} = formData;
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
	const onHtmlChange = e => setFormData({...formData, ['html']: e});
	const onCssChange = e => setFormData({...formData, ['css']: e});


const onSubmit = async e =>{
	e.preventDefault();
	formData.username = user.name;
	createButton(formData, history);
}



	return(
		<Fragment>
			<h1 className="text-4xl font-bold text-center text-blue-500">Create Button</h1>
			<p className="text-2l font-bold text-center text-blue-500">Create Your Button</p>


			<form onSubmit={e => onSubmit(e)}>

				<input  onChange={e => onChange(e)} placeholder="Title" name="title" value={title} type="text"/>
				<small className="text-xs">Title of Your Button</small>
				<br />
				<br />


				<div className="editor editor-split">
					<AceEditor
    mode="html"
    onChange={e => onHtmlChange(e)}
    value={html}
    name="html"
      wrapEnabled="true"
    editorProps={{ $blockScrolling: true }}
      setOptions={{
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  showLineNumbers: true,
  tabSize: 2,
  }}
  />

  <AceEditor
    mode="css"
    onChange={e => onCssChange(e)}
    value={css}
    name="css"
          wrapEnabled="true"
      setOptions={{
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  showLineNumbers: true,
  tabSize: 2,
  }}
  />



				</div>


							<div className="button-preview container text-center my-3 shadow">
							<span className="text-2l font-bold  text-blue-500">Live Preview</span>
          {Style.it(formData.css,
           <div> {ReactHtmlParser (formData.html)}</div>
          )}
			</div>



				<input className="btn btn-blue" type="submit" value="Submit" placeholder="Submit"/>
			</form>



		</Fragment>
	)

}

CreateButton.propTypes = {
	createButton: PropTypes.func.isRequired,
	button: PropTypes.object.isRequired,
	  user: PropTypes.object,
}


const mapStateToProps = state => ({
	user: state.auth.user,
	button: state.button
});


export default connect(mapStateToProps, { createButton})(
	withRouter(CreateButton)
);

