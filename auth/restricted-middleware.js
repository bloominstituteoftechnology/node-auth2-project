const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  const [directive, token] = req.headers.authorization.split(' ');
  
  if (!directive || directive != 'bearer') {
    res.status(401).json({ learn: 'to type '});
  }
 
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({you:'cant touch this'});
      } else {
        req.decodedJwt = decodedToken;
        console.log(decodedToken);
        next();
      }
    })
  } else {
    res.status(401).json({you: 'shall not pass'});
  }
};