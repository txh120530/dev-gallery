const mongoose = require('mongoose');

const ButtonSchema = new mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	}, 
	username: {
		type: String,
		ref: 'user'
	},
	title: {
		type: String,
		required: true
	}, 
	html: {
		type: String,
		required: true,
	},
	css: {
		type: String,
		required: true,
	},
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Button = mongoose.model('Button', ButtonSchema);