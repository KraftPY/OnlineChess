const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/registration', (req, res) => {
  const { login, email, password, rePassword } = req.body;
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  switch (true) {
    case !login || !email || !password || !rePassword:
      res.json({
        status: false,
        fields: ['login', 'email', 'password', 'rePassword'],
        msg: 'All fields must be filled!'
      });
      break;
    case login.length < 3 || login.length > 16:
      res.json({
        status: false,
        fields: ['login'],
        msg: 'Login length from 3 to 16 characters!'
      });
      break;
    case !pattern.test(email):
      res.json({
        status: false,
        fields: ['email'],
        msg: 'Not email format!'
      });
      break;
    case password !== rePassword:
      res.json({
        status: false,
        fields: ['password', 'rePassword'],
        msg: 'Passwords do not match!'
      });
      break;
    default:

      User.create({
        login: login.replace(/\s+/g, ' ').trim(),
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        email: email.replace(/\s+/g, ' ').trim(),
        firstName: '',
        lastName: '',
      }).then(() => res.json({ status: true, msg: 'Registration successful!', fields: [] }))
        .catch(err => {
          if (err.code == 11000) {
            const msg = `User with this ${Object.keys(err.keyValue)[0]} is already there!`;
            res.json({ status: false, msg, fields: [Object.keys(err.keyValue)[0]] });
          } else {
            res.json({ status: false, msg: err.name, fields: [] });
          }
        });
      break;
  }

});

module.exports = router;