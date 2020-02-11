module.exports = {
	PORT: process.env.PORT || 80,
	MONGO_LOCAL_URL: 'mongodb://localhost:27017/users_db',
	MONGO_URL: 'mongodb+srv://dbUser:userpass@kraftdb-eonvl.gcp.mongodb.net/test?retryWrites=true&w=majority',
	MONGO_OPTIONS: {
		useUnifiedTopology: true,
		useNewUrlParser: true
	}
};
