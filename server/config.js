module.exports = {
	PORT: process.env.PORT || 8888,
	MONGO_LOCAL_URL: 'mongodb://localhost:27017/users_db',
	MONGO_URL: 'mongodb+srv://dbUser:userpass@kraftdb-eonvl.gcp.mongodb.net/OnlineChess?retryWrites=true&w=majority',
	MONGO_OPTIONS: {
		useUnifiedTopology: true,
		useNewUrlParser: true
	},
	JWT_SECRED: 'ojkasf;lkjas;lkfklsa;fjkoasdp[f[21409231'
};
