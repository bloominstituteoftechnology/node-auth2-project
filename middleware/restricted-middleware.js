const jwt = require('jsonwebtoken');
const secrets = require('../config/secret.js');

module.exports = (req, res, next) => {

  try { 
    const token = req.headers.authorization.split(" ")[1];// use for postman to access the users list
    //const token = req.headers.authorization; // use for the app

    if (token) { // if the token exists jwt will verify if is 
        //the same token ad that it has the same secret
      jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
        if (err) { //if not will return error
          res.status(401).json({ you: "can't touch this" });
        } else {
          req.decodedJwt = decodedToken;
        console.log(req.decodedJwt.roles , "decodedToken");
          next();
        }
      })
    } else {
      throw new Error('invalid auth data');
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }

};