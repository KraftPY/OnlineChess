const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.get('/list-games', async (req, res) => {
  Game.find().then(arrGames => {
    const data = arrGames.map(game => {
      return {
        name: game.name,
        user: game.user,
        color: game.color,
      };
    });
    res.json({ status: true, data });
  });
});

module.exports = router;