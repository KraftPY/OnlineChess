const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const middleAuth = require('../middleware/auth');
const Game = require('../models/game');

router.post('/create-game', middleAuth, (req, res) => {
  const { name, color, password } = req.body;
  const user = req.userData.login;
  const patternNoHTML = /<|>/g;

  if (!name || name.length < 3 || name.length > 16 || patternNoHTML.test(name)) {
    res.json({ status: false, msg: 'Name must be between 3 and 16 characters!' });
  } else {
    Game.create({
      name: name.replace(/\s+/g, ' ').trim(),
      user,
      userColor: color,
      opponent: '',
      opColor: '',
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      gameHistory: ''
    })
      .then((data) => res.json({ status: true, msg: 'Create successful!', gameId: data._id }))
      .catch(err => {
        if (err.code == 11000) {
          const msg = `Game with that name has already been created!`;
          res.json({ status: false, msg });
        } else {
          res.json({ status: false, msg: err.name });
        }
      });
  }
});

module.exports = router;