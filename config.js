module.exports = {
	PORT: process.env.PORT || 80,
	MONGO_URL: 'mongodb://localhost:27017/users_db',
	MONGO_OPTIONS: {
		useUnifiedTopology: true,
		useNewUrlParser: true
	}
};
