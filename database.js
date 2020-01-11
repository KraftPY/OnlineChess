const config = require('./config');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: config.DB_CONECTION.host,
	user: config.DB_CONECTION.user,
	database: config.DB_CONECTION.database,
	password: config.DB_CONECTION.password,
	port: config.DB_CONECTION.port
});

connection.connect((err) => {
	if (err) throw err;
	console.log('Подключение к серверу MySQL успешно установлено');
});

module.exports = connection;
