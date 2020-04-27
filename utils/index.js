const jwt = require('jsonwebtoken');
const secret = require('../config/secrets');

function genToken(user) {
  const payload = {
    userid: user.userid,
    username: user.username,
    roleid: user.roleid,
    admin: user.admin,
  };
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secret.jwtsecret, options);

  return token;
}

module.exports = {
  genToken,
};
