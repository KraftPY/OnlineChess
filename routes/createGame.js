const express = require('express');
const router = express.Router();
// const middleAuth = require('../middleware/auth');
const Game = require('../models/game');

// router.get('/create-game', middleAuth, async (req, res) => {
//   const user = await User.findOne({ _id: req.userData.id });
//   const data = {
//     login: user.login,
//     email: user.email,
//     firstName: user.firstName,
//     lastName: user.lastName,
//   };
//   res.json({ status: true, data });
// });

router.post('/create-game', (req, res) => {
  const { name, user, color, password } = req.body;

  Game.create({ name, user, color, password }).then(() => res.json({ status: true, msg: 'Create successful!', fields: [] }))

  // const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // switch (true) {
  //   case !login || !email || !password || !rePassword:
  //     res.json({
  //       status: false,
  //       fields: ['login', 'email', 'password', 'rePassword'],
  //       msg: 'All fields must be filled!'
  //     });
  //     break;
  //   case login.length < 3 || login.length > 16:
  //     res.json({
  //       status: false,
  //       fields: ['login'],
  //       msg: 'Login length from 3 to 16 characters!'
  //     });
  //     break;
  //   case !pattern.test(email):
  //     res.json({
  //       status: false,
  //       fields: ['email'],
  //       msg: 'Not email format!'
  //     });
  //     break;
  //   case password !== rePassword:
  //     res.json({
  //       status: false,
  //       fields: ['password', 'rePassword'],
  //       msg: 'Passwords do not match!'
  //     });
  //     break;
  //   default:

  //     User.create({
  //       login: login.replace(/\s+/g, ' ').trim(),
  //       password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  //       email: email.replace(/\s+/g, ' ').trim(),
  //       firstName: '',
  //       lastName: '',
  //     }).then(() => res.json({ status: true, msg: 'Registration successful!', fields: [] }))
  //       .catch(err => {
  //         if (err.code == 11000) {
  //           const msg = `User with this ${Object.keys(err.keyValue)[0]} is already there!`;
  //           res.json({ status: false, msg, fields: [Object.keys(err.keyValue)[0]] });
  //         } else {
  //           res.json({ status: false, msg: err.name, fields: [] });
  //         }
  //       });
  //     break;
  // }

});

module.exports = router;