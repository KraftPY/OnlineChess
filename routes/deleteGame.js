const express = require("express");
const router = express.Router();
const middleAuth = require("../middleware/auth");
const Game = require("../models/game");

router.post("/delete-game", middleAuth, async (req, res) => {
  const gameId = req.body.id;
  const user = req.userData.login;

  const game = await Game.findOne({ _id: gameId });

  if (game.user === user || game.opponent === user) {
    Game.deleteOne({ _id: gameId })
      .then(() => res.json({ status: true }))
      .catch(err => console.log(err));
  } else {
    res.json({ status: false, msg: "You cannot leave this game!" });
  }
});

module.exports = router;
