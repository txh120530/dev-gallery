const mongoose = require('mongoose');
// Allows default.json to be used as config
const config = require("config");
const db = config.get('mongoURI');



// Since mongoose returns promises, put the call to the database inside an async function
const connectDB = async () =>{
	// Try catch, in case there are errors
	try {
		await mongoose.connect(db, 
			{ 
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			 }
			);
		console.log('MongoDB Connected...')
	} catch(err) {
		console.error(err.message);
		// Exit process with faulure
		process.exit(1);
	}
}

module.exports = connectDB;