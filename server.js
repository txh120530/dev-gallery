const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser')

const connectDB = require('./config/db');
require("./services/passport-services.js");
const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.get('/', (req, res) => {res.send('API Running')});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/google', require('./routes/api/google'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));
app.use('/api/buttons', require('./routes/api/buttons'));


// 404 Error for unhandled routes
app.get('*', function(req, res){
  res.status(404).send('What?');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {console.log(`Server is running at ${PORT}`)});