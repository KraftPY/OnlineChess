const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// создаем описание одной сущности User, которые будут храниться в коллекции БД
const schema = new Schema({
	login: {
		type: String,
		required: true
	},
	pass: String
});

module.exports = mongoose.model('User', schema);
