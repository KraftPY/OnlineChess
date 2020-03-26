const express = require('express');
const router = express.Router();
const middleAuth = require('../middleware/auth');
const User = require('../models/user');

router.get('/setting', middleAuth, async (req, res) => {
  const user = await User.findOne({ _id: req.userData.id });
  const data = {
    login: user.login,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  res.json({ status: true, data });
});

module.exports = router;