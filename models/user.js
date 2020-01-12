const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	login: {
		type: String,
		required: true
	},
	pass: String
});

module.exports = mongoose.model('User', schema);
