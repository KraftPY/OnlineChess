const express = require("express");
const router = express.Router();
const middleAuth = require("../middleware/auth");

router.post("/join-game", middleAuth, (req, res) => {
  res.json({ status: true, msg: "Join successful!" })
});

module.exports = router;
