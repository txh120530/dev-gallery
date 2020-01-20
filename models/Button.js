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
	classes: [
		{
				type: String,
				required: true
		}
	], 
	html: {
		type: String,
		required: true,
		default: "<a class='{class}'>{placeholder}</a>"
	},
	css: [{
		type: String,
		required: true,
		default: 
		".{class}{background-color: red; color: white;}"
	}]
});

module.exports = Button = mongoose.model('Button', ButtonSchema);