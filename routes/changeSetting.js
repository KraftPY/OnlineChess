const express = require('express');
const router = express.Router();
const middleAuth = require('../middleware/auth');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/change-setting', middleAuth, async (req, res) => {
  const user = await User.findOne({ _id: req.userData.id });
  const { firstName, lastName, email, oldPassword, newPassword, newRePassword } = req.body;
  const patternEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternName = /([A-Za-zА-Яа-яЁёІіЇїЄє-]{1,50})+((\s+([A-Za-zА-Яа-яЁёІіЇїЄє-]{1,50})+)?)+/;

  switch (true) {
    case !patternName.test(firstName) || !patternName.test(lastName):
      res.json({
        status: false,
        fields: ['firstName', 'lastName'],
        msg: 'Not name format!'
      });
      break;
    case !email || !patternEmail.test(email):
      res.json({
        status: false,
        fields: ['email'],
        msg: 'Not email format!'
      });
      break;
    case oldPassword && !bcrypt.compareSync(oldPassword, user.password):
      res.json({
        status: false,
        fields: ['oldPassword'],
        msg: 'Wrong password!'
      });
      break;
    case !oldPassword && newPassword:
      res.json({
        status: false,
        fields: ['oldPassword'],
        msg: 'Enter your password!'
      });
      break;
    case newPassword !== newRePassword:
      res.json({
        status: false,
        fields: ['newPassword', 'newRePassword'],
        msg: 'Passwords do not match!'
      });
      break;
    default:
      User.updateOne({
        _id: req.userData.id
      }, {
        $set: {
          firstName: firstName.replace(/\s+/g, ' ').trim(),
          lastName: lastName.replace(/\s+/g, ' ').trim(),
          email: email.replace(/\s+/g, ' ').trim(),
          password: (newPassword) ? bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)) : user.password,
        }
      }).then(() => {
        res.json({ status: true, msg: 'Settings changed successfully!', fields: [] })
      }).catch(err => {
        res.json({ status: false, msg: err.name, fields: [] })
      });
      break;
  }
});

module.exports = router;