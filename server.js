// подкл. веб-фреймворк Express и настраиваем его
const app = require('./app');

// подкл. config с нужными настройками для дальнейшей работы
const config = require('./config');

// подкл. monegoose для работы с БД MongoDB
const database = require('./database');

// пробуем подлючиться к нашей БД
database()
	.then((db_info) => {
		console.log(
			`Connected to MongoDB - ${db_info.connections[0].host}:${db_info.connections[0].port}/${db_info.connections[0].name}`
		);

		// если подключились к БД, тогда запускаем наше приложение
		app.listen(config.PORT, () => {
			console.log(`Example app listening on port ${config.PORT}!`);
		});
	})
	.catch(() => {
		console.log('No database connection!');
	});
