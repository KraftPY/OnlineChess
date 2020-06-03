const mongoose = require('mongoose');
const config = require('./config');

mongoose.set('useCreateIndex', true);

module.exports = () => {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(config.MONGO_URL, config.MONGO_OPTIONS)
			.then((db_info) => resolve(db_info))
			.catch((err) => reject(err));
	});
};
