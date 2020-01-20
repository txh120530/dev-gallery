const express = require('express');
const passport = require('passport');
const helmet = require('helmet');

const connectDB = require('./config/db');
require("./services/passport-services.js");
const app = express();

connectDB();

// Init Middleware
app.use(express.json({extended: false}));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {res.send('API Running')});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/google', require('./routes/api/google'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));


// 404 Error for unhandled routes
app.get('*', function(req, res){
  res.status(404).send('What?');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {console.log(`Server is running at ${PORT}`)});