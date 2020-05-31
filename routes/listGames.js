const express = require("express");
const router = express.Router();
const Game = require("../models/game");

router.get("/list-games", async (req, res) => {
  Game.find().then(arrGames => {
    const data = arrGames.map(game => {
      return {
        id: game._id,
        name: game.name,
        user: game.user,
        userColor: game.userColor
      };
    });
    console.log(data);

    res.json({ status: true, data });
  });
});

module.exports = router;
