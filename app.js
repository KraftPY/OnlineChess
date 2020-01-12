const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	User.find().then((data) => {
		res.render('index', { data });
	});
});

app.get('/testPost', (req, res) => {
	res.render('testPost');
});

app.post('/testPost', (req, res) => {
	const { login, pass } = req.body;

	User.create({
		login: login,
		pass: pass
	}).then((post) => console.log(post._id));

	// const newUser = new User({ login: login, pass: pass });
	// newUser.save().then((post) => console.log(post._id));

	res.redirect('/');
});

module.exports = app;
