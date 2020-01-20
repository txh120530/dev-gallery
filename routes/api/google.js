const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

const router = express.Router();



// @route 	POST api/google
// @desc 		Login with Google
// @access 	PUBLIC
router.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] }));



// Auth
router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),

  function(req, res) {
    // Successful authentication, redirect home.

    res.redirect('../../');
  });



passport.use(new GoogleStrategy({
    clientID: config.get('GOOGLE_CLIENT_ID'),
    clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
    callbackURL: "/api/google/callback"
  },
  async(accessToken, refreshToken, profile, done) => {

    try{
      User.findOne({
        $or: [
          {'google.id' : profile.id},
          { 'email' : profile.emails[0].value }
        ]
      }, async function(err, user){
        if(err){
          console.error(err.message);
          res.status(500).send('Server error');
        }

        if (user) {
	        return res.status(400).json({errors: [{msg: 'A user with that email already exisits!'}]});          
        } else {
          let newUser = new User();
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.email = profile.emails[0].value;
          newUser.google.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.email = profile.emails[0].value;
          newUser.password = randomstring.generate();

          	        // Bcrypt password
	        const salt = await bcrypt.genSalt(10);
	        newUser.password = await bcrypt.hash(newUser.password, salt)
	        newUser.google.token = await bcrypt.hash(newUser.google.token, salt)

          newUser.save()
            .then(newUser => done(null, newUser));

          const payload = {
            user: {
              id: newUser.id
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
      }
      )



    }catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
    }

  }
));

module.exports = router;