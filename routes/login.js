const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  if (!login && !password) {
    return res.json({ status: false, fields: ['login', 'password'], msg: 'All fields must be filled!' });
  } else if (!login) {
    return res.json({ status: false, fields: ['login'], msg: 'All fields must be filled!' });
  } else if (!password) {
    return res.json({ status: false, fields: ['password'], msg: 'All fields must be filled!' });
  }

  const user = await User.findOne({ login: login });

  if (user && bcrypt.compareSync(password, user.password)) {
    console.log(user._id);
    const token = jwt.sign({ id: user._id }, config.JWT_SECRED, { expiresIn: '1m' });
    return res.json({
      status: true,
      token: token,
      user: {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } else {
    res.json({ status: false, fields: ['login', 'password'], msg: 'User with this password is not registered!' });
  }
});

module.exports = router;