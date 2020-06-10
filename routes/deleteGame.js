const express = require("express");
const router = express.Router();
const middleAuth = require("../middleware/auth");

router.post("/delete-game", middleAuth, (req, res) => {

  console.log(req.body);

  res.json({ status: true, msg: "Delete successful!" })
});

module.exports = router;
