const mongoose = require('mongoose');

const ButtonSchema = new mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	}, 
	name: {
		type: String,
		required: true
	}, 
	mainClass: {
		type: String,
		required: true
	},
	html: {
		type: String,
		required: true,
	},
	secondaryClasses: [{
				type: String,
				required: true
		}], 
	css: [{
		type: String,
		required: true,
	}],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Button = mongoose.model('Button', ButtonSchema);