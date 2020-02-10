const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const config = require('config');
const request = require('request');
const sanitizeHtml = require('sanitize-html');

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
				html: req.body.html,
				avatar: user.avatar,
				css: req.body.css,
				user: req.user.id
			})

			if(req.body.username){
				newButton.username = req.body.username;
			}
	 
			const button = await newButton.save();
			return res.json(button);

		} catch(err){
			console.error(err.message);
			res.status(500).send('Server Error');
		}
});


// @route 	GET api/buttons/:id
// @desc 		Get all buttons
// @access 	Private
router.get('/:id', auth(), async(req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		const button = await Button.findById(req.params.id);
		if(!button){
			return res.status(404).json({msg: 'Button not Found'})
		}
		console.log(button);
		res.json(button);
	} catch(err){
		if(err.kind === 'ObjectId'){
			return res.status(404).json({msg: 'Button not Found'})
		}
		console.error(err.message);
		res.status(500).send('Server Error');
	}

});

// @route 	GET api/buttons/
// @desc 		Get all buttons
// @access 	Private
router.get('/', auth(), async(req, res) => {
	try {
		const buttons = await Button.find().sort({date: -1});

		res.json(buttons);
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}


});





// @route 	PUT api/buttons/edit/:button_id
// @desc 		Edit button
// @access 	Private

router.post('/:button_id', 
	[auth(), 
		[
		check('title', 'Title is required').not().isEmpty(), 
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

			// Check user
			console.log("Roles: " + user.roles);
			if(button.user.toString() !== req.user.id && !user.roles.includes("editor") && !user.roles.includes("admin")){
				return res.status(401).json({msg: 'User not authorized'});
			}
			// Create new button object to store values

			// Required values
			const buttonFields = {
				title: req.body.title,
				html: req.body.html,
				css: req.body.css
			};

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


// @route 	Delete api/button/:id
// @desc 		Delete button by ID
// @access 	Private
router.delete('/:id', auth(), async(req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		const button = await Button.findById(req.params.id);
		if(!button){
			return res.status(404).json({msg: 'Button not Found'})
		}
		// Check user

		if(button.user.toString() !== req.user.id && !user.roles.includes("editor") && !user.roles.includes("admin")){
			return res.status(401).json({msg: 'User not authorized'});
		}
		await button.remove();
		res.json({msg: 'Button removed' });

	} catch(err){
		if(err.kind === 'ObjectId'){
			return res.status(404).json({msg: 'Button not Found'})
		}
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});



// @route 	PUT api/button/likes/:id
// @desc 		Like a button
// @access 	Private
router.put('/like/:id', auth(), async(req, res) => {
	try{
		const button = await Button.findById(req.params.id);
		if(!button){
			return res.status(404).json({msg: 'Button not Found'})
		}

		// Check if the button has already been liked
		if(button.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
			return res.status(400).json({msg: 'Button already liked'});
		}

		button.likes.unshift({user: req.user.id});
		await button.save();
		res.json(button.likes);

	} catch(err){
		if(err.kind === 'ObjectId'){
			return res.status(404).json({msg: 'Button not Found'})
		}
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route 	PUT api/buttons/unlike/:id
// @desc 		Unlike a button
// @access 	Private
router.put('/unlike/:id', auth(), async(req, res) => {
	try{
		const button = await Button.findById(req.params.id);
		if(!button){
			return res.status(404).json({msg: 'Button not Found'})
		}

		// Check if the button has already been liked
		if(button.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
			return res.status(400).json({msg: 'No likes from user found'});
		}

		const removeIndex = button.likes.map(like => like.user.toStrong()).indexOf(req.user.id);

		button.likes.splice(removeIndex, 1);
		await button.save();
		res.json(button.likes);


	} catch(err){
		if(err.kind === 'ObjectId'){
			return res.status(404).json({msg: 'Button not Found'})
		}
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});








module.exports = router;