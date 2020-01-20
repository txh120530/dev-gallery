const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route 	GET api/auth
// @desc 		Authenticate User & get token
// @access 	PUBLIC
router.post('/', 
// Validator
[
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Password is required').exists()
],	
 async (req, res) => { 
 	// Check if validation failed and send error if so
 	const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If passed, send the data through
    try{
	    // Check if this user already exisits
	    let user = await User.findOne({ email: req.body.email });
	    console.log(user);
	    if (!user) {
	      return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
	    } else {



	    	  const isMatch = await bcrypt.compare(req.body.password, user.password);

	    	  if(!isMatch){
	    	  	if(user.google.email === req.body.email){
	    	  		console.log('Google login');
	    	  								return res.status(400).json({errors: [{msg: 'Please log in using the Google Link'}]});
	    	  	}
						return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
	    	  }

	        const payload = {
	        	user: {
	        		id: user.id
	        	}
	        }

	        jwt.sign(
	        	payload, 
	        	config.get('jwtSecret'),
	        	{ expiresIn: 36000 },
	        	(err, token) => {
	        		if(err) throw(err);
	        		res.json({token});
	        	});
			}
			// Server Error
		} catch(err){
			console.error(err.message);
			res.status(500).send('Server error');
		}
});

module.exports = router;