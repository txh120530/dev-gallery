const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const User = require('../../models/User');


// @route 	POST api/users
// @desc 		Register user
// @access 	PUBLIC
router.post('/', 
// Validator
[
	check('name', 'Name is required').not().isEmpty(),
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
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
	    if (user) {
	        return res.status(400).json({errors: [{msg: 'A user with that email already exisits!'}]});
	    } else {
	    	  // set gravatar from email
	    		const avatar = gravatar.url(req.body.email, {
	    			s: '200',
	    			r: 'pg',
	    			d: 'mm'
	    		})

	        // Insert the new user if they do not exist yet
	        user = new User({
	            name: req.body.name,
	            email: req.body.email,
	            avatar,
	            password: req.body.password,
	            roles: ['user']
	        });

	        // Bcrypt password
	        const salt = await bcrypt.genSalt(10);
	        user.password = await bcrypt.hash(user.password, salt)

	        await user.save();

	        const payload = {
	        	user: {
	        		id: user.id
	        	}
	        }
	        console.log(user);
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