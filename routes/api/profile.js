const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const config = require('config');
const request = require('request');

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


// @route 	GET api/profile/all
// @desc 		Get all profiles
// @access 	Public

router.get('/all', async (req, res) =>{
	try{
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);
		res.json(profiles);
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})


// @route 	GET api/profile/:id
// @desc 		Get a user's profile
// @access 	Public

router.get('/:id', async (req, res) =>{
	try{
		let profile = await Profile.findById(req.params.id);
		// If Profile not found
		if(!profile){
			return res.status(400).send('Profile not Found');
		}

		res.json(profile);
	} catch(err) {
		if(err.kind === 'ObjectId'){
			return res.status(404).json({msg: 'Post not Found'})
		}
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


// @route 	ADD api/profile/experience/
// @desc 		Add profile experience
// @access 	Private

router.put('/experience/', [auth(), 
	[check('title', 'Title is required').not().isEmpty(), check('company', 'Company is required').not().isEmpty(), check('from', 'From Date is required').not().isEmpty()]], 
	async (req, res) =>{
		const errors = validationResult(req);
		if (!errors.isEmpty()){
			    return res.status(400).json({ errors: errors.array() });
		}

		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		}  = req.body;

		const newExp =  {
			title,
			company,
			location,
			from,
			to,
			current,
			description
		};

	try{
		const profile = await Profile.findOne({user: req.user.id});

		profile.experience.unshift(newExp);
		await profile.save();
		res.json(profile)
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


// @route 	DELETE api/profile/experience/:exp_id
// @desc 		Delete profile experience
// @access 	Private

router.delete('/experience/:exp_id', auth(), async (req, res) =>{
	try{
		const profile = await Profile.findOne({user: req.user.id});

		const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);

		await profile.save();
		res.json(profile);
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});







// @route 	ADD api/profile/education
// @desc 		Add profile education
// @access 	Private

router.put('/education/', [auth(), 
	[check('school', 'School is required').not().isEmpty(), check('from', 'From Date is required').not().isEmpty()]], 
	async (req, res) =>{
		const errors = validationResult(req);
		if (!errors.isEmpty()){
			    return res.status(400).json({ errors: errors.array() });
		}

		const {
			school,
			from,
			to,
			major
		}  = req.body;

		const newExp =  {
			school,
			from,
			to,
			major
		};

	try{
		const profile = await Profile.findOne({user: req.user.id});

		profile.education.unshift(newExp);
		await profile.save();
		res.json(profile)
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});


// @route 	DELETE api/profile/education/:exp_id
// @desc 		Delete profile education
// @access 	Private

router.delete('/education/:edu_id', auth(), async (req, res) =>{
	try{
		const profile = await Profile.findOne({user: req.user.id});

		const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

		profile.education.splice(removeIndex, 1);

		await profile.save();
		res.json(profile);
	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route 	GET api/profile/github/:username
// @desc 		Get user repos from Github
// @access 	Public


router.get('/github/:username', async (req, res) => {
	try{
		const options = {
			uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('GITHUB_CLIENT_ID')}&client_secret=${config.get('GITHUB_CLIENT_SECRET')}`,
			method: 'GET',
			headers: {'user-agent': 'node.js'}
		};

		request(options, (error, response, body) => {
			if(error){
				console.error(error);
			}
			if(response.statusCode !== 200){
				res.status(404).json({msg: 'No Github profile found' });
			}
			res.json(JSON.parse(body));
		});

	} catch(err){
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});



module.exports = router;