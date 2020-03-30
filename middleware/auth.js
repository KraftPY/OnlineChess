const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    res.status(401).json({ msg: 'Token not provided!' })
  } else {
    jwt.verify(token, config.JWT_SECRED, (err, decoded) => {
      if (err) {
        res.json({ status: false, msg: err.name, fields: [] });
      } else {
        req.userData = decoded;
        next();
      }
    });

  }

};