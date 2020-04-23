// подкл. веб-фреймворк Express
const { server } = require('./app');

// подкл. config с нужными настройками для дальнейшей работы
const config = require('./server/config');


// подкл. Socket.io и callback обработчик событий 
const io = require('socket.io')(server);
const socketIO = require('./server/socket');

// подкл. monegoose для работы с БД MongoDB
const database = require('./server/database');

// пробуем подлючиться к нашей БД
database()
	.then((db_info) => {
		console.log(
			`Connected to MongoDB - ${db_info.connections[0].host}:${db_info.connections[0].port}/${db_info.connections[0].name}`
		);

		// если подключились к БД, тогда запускаем наше приложение
		server.listen(config.PORT, () => {
			console.log(`Example app listening on port ${config.PORT}!`);
		});

		// запускаем socket.io подключение
		io.on('connection', socketIO);
	})
	.catch(() => {
		console.log('No database connection!');
	});

