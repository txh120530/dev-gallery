const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	roles: [{
			type: String
		}],
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
	},
	avatar: {
		type: String
	}, 
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('user', UserSchema);