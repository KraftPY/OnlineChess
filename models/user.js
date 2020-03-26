const { Schema, model } = require('mongoose');

// создаем описание одной сущности User, которые будут храниться в коллекции БД
const schema = new Schema({
	login: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: String,
	lastName: String
});

module.exports = model('User', schema);
