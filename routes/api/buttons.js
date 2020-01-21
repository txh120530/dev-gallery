const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const config = require('config');
const request = require('request');

const auth = require('../../middleware/auth');

const Button = require('../../models/Button');
const User = require('../../models/User');



// @route 	POST api/buttons/
// @desc 		Create button
// @access 	Private

router.post('/', 
	[auth(), 
		[
		check('title', 'Title is required').not().isEmpty(), 
		check('mainClass', 'Primary Class is required').not().isEmpty(),
		check('html', 'HTML is required').not().isEmpty(),
		check('css', 'CSS is required').not().isEmpty()
		]
	],
	async (req, res) =>{
		const errors = validationResult(req);
		if (!errors.isEmpty()){
			    return res.status(400).json({ errors: errors.array() });
		}

		try {
			// Search for profile by user ID
			let user = await User.findById(req.user.id).select('-password');

			// Create new button object to store values

			// Required values
			const newButton = new Button({
				title: req.body.title,
				mainClass: req.body.mainClass,
				html: req.body.html,
				avatar: user.avatar,
				user: req.user.id
			})


	  const {
	  	secondaryClasses,
	  	css
	  } = req.body;

		newButton.css = css.map(css => css.trim());

	  // Check for secondar values
		if(secondaryClasses) {
			newButton.secondaryClasses = secondaryClasses.map(cssClass => cssClass.trim());
		}



			const button = await newButton.save();
			return res.json(button);

		} catch(err){
			console.error(err.message);
			res.status(500).send('Server Error');
		}
    


});

// @route 	PUT api/buttons/edit/:button_id
// @desc 		Edit button
// @access 	Private

router.post('/edit/:button_id', 
	[auth('editor'), 
		[
		check('title', 'Title is required').not().isEmpty(), 
		check('mainClass', 'Primary Class is required').not().isEmpty(),
		check('html', 'HTML is required').not().isEmpty(),
		check('css', 'CSS is required').not().isEmpty()
		]
	],
	async (req, res) =>{
		const errors = validationResult(req);
		if (!errors.isEmpty()){
			    return res.status(400).json({ errors: errors.array() });
		}

		try {
			// Search for profile by user ID
			let user = await User.findById(req.user.id).select('-password');
			let button = await Button.findById(req.params.button_id);

			console.log(button.id);
			// Create new button object to store values

			// Required values
			const buttonFields = {
				title: req.body.title,
				mainClass: req.body.mainClass,
				html: req.body.html
			};


	  const {
	  	secondaryClasses,
	  	css
	  } = req.body;

		buttonFields.css = css.map(css => css.trim());

	  // Check for secondar values
		if(secondaryClasses) {
			buttonFields.secondaryClasses = secondaryClasses.map(cssClass => cssClass.trim());
		}

		await Button.findOneAndUpdate(
			{_id: button.id},
			{$set: buttonFields},
			{upsert: true}
		);

			const editedButton = await button.save();
			return res.json(editedButton);

		} catch(err){
			console.error(err.message);
			res.status(500).send('Server Error');
		}
    


});








module.exports = router;