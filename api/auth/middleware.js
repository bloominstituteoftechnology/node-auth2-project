const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secret.js");

const validateUserData  = (req, res, next) => {
  
    if (req.username && req.password && typeof req.password === "string") {
        next();
    } else {
        res.status(403).json("Invalid data in crendential data.");
    }
};

const restricted =  (req, res, next) => {
   
    const token = req.headers.authrorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json("Invalid token");
            } else {
                req.decodedToken = decoded;
                next();
            }
        });
    } else {
        res.status(401).json("You are not authenticated");
    }
};

module.exports = {
    validateUserData,
    restricted,
};
