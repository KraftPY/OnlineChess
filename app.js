const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const server = require('http').Server(app);
// модуль для обработки POST запроса
const bodyParser = require('body-parser');
// модуль для работы с путями к статик. файлами
const path = require('path');

const routes = require('./routes');


// подкл. шаблонизатор для Express и указываем папку по умолч. с шаблонами
app.set('view engine', 'ejs');
app.set('views', './views');

// указываем путь к favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// указываем чтоб app использовало для декодирования POST запросов body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// указываем путь к статическим файлам
app.use('/public', express.static(path.join(__dirname, 'public')));

// Обработка GET/POST запросов

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/registration', routes.registration);
app.post('/login', routes.login);
app.get('/setting', routes.setting);
app.post('/change-setting', routes.changeSetting);
app.post('/create-game', routes.createGame);
app.post('/join-game', routes.joinGame);
app.get('/list-games', routes.listGames);
app.post('/delete-game', routes.deleteGame);

module.exports = {
	app,
	server
};
