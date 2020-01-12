const app = require('./app');
const config = require('./config');
const database = require('./database');

database()
	.then((db_info) => {
		console.log(
			`Connected to MongoDB - ${db_info.connections[0].host}:${db_info.connections[0].port}/${db_info.connections[0].name}`
		);
		app.listen(config.PORT, () => {
			console.log(`Example app listening on port ${config.PORT}!`);
		});
	})
	.catch(() => {
		console.log('No database connection!');
	});
