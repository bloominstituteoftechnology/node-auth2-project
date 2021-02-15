const jwt = require('jsonwebtoken');
const secrets = require("../../config/secrets.js");

module.exports = (req,res,next) => {
    const token = req.headers?.authorization.split(" ")[1];

    // token = req.headers.authorization && req.headers.authorization.split(" ")[1]

    if (token) {
       jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
           if (err) {
            res.status(401).json({you: "cant't touch this!"})
           } else {
               req.decodeJWT = decodeToken;
               next();
           }
       })
    } else {
        res.status(401).json({you: "cant't pass!"})
    }

}
