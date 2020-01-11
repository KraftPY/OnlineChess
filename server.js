const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const database = require('./database');

const arr = [];

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('index', { arr: arr });
});

app.get('/testPost', (req, res) => {
	res.render('testPost');
});

app.post('/testPost', (req, res) => {
	arr.push(req.body);
	res.redirect('/');
});

app.listen(config.PORT, () => {
	console.log(`Example app listening on port ${config.PORT}!`);
});
