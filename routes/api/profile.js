const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');


// @route 	GET api/profile/me
// @desc 		Get current users profile
// @access 	Private

router.get('/me', auth(), async (req, res) => {
	try{
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
	
		if(!profile){
			return res.status(400).json({msg: 'There is no profile for this user'});
		}

		res.json(profile);

	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}

});

// @route 	POST api/profile/
// @desc 		Create or update user profile
// @access 	Private

router.post('/', 
	[auth(), 
		[check('status', 'Status is required').not().isEmpty(), 
		check('skills', 'Skills are required').not().isEmpty()]
	],
	async (req, res) =>{
		const errors = validationResult(req);
		if (!errors.isEmpty()){
			    return res.status(400).json({ errors: errors.array() });
		}

		// pull fields from body

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;

		// Build profile object
		const profileFields = {};

		profileFields.user = req.user.id;

		if(company) profileFields.company = company;
		if(website) profileFields.website = website;
		if(location) profileFields.location = location;
		if(bio) profileFields.bio = bio;
		if(status) profileFields.status = status;
		if(githubusername) profileFields.githubusername = githubusername;

		if(skills) {
			profileFields.skills = skills.split(',').map(skill => skill.trim());
		}

		// Build social object =
		profileFields.social = {};

		if(facebook) profileFields.social.facebook = facebook;
		if(twitter) profileFields.social.twitter = twitter;
		if(instagram) profileFields.social.instagram = instagram;
		if(youtube) profileFields.social.youtube = youtube;
		if(linkedin) profileFields.social.linkedin = linkedin;

		try {
			// Search for profile by user ID
			let profile = await Profile.findOne({user: req.user.id});

			if(profile){
				// Update
							console.log("Edit");

				profile = await Profile.findOneAndUpdate(
					{user: req.user.id},
				 {$set: profileFields},
				 {new: true});

				return res.json(profile);
			}

			// Create if profile not made

			profile = new Profile(profileFields);
			console.log("Create");
			await profile.save();
			return res.json(profile);

		} catch(err){
			console.error(err.message);
			res.status(500).send('Server Error');
		}
    


});


// @route 	DELETE api/profile/delete
// @desc 		Delete profile
// @access 	Private

router.delete('/delete', auth, async (req, res) =>{
	try{
		await Profile.findOneAndRemove({user: req.user.id});
		await User.findOneAndRemove({_id: req.user.id});

		res.json({msg: 'User Deleted'});
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


// @route 	GET api/profile/:id
// @desc 		Get a user's profile
// @access 	Public

router.get('/:id', async (req, res) =>{
	console.log(req.params.id);
	try{
		let profile = await Profile.findById(req.params.id);
		// If Profile not found
		if(!profile){
			return res.status(400).send('Profile not Found');
		}

		res.json(profile);
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


module.exports = router;