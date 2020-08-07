const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(401).json({ message: "Missing Authorization header" });
    }
    const [authType, token] = req.headers.authorization.split(" ");

    if(authType.toUpperCase() === "BEARER" && token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(!err) {
                req.jwt = decodedToken;
                next();
            } else {
                res.status(401).json({ message: "Invalid Token!" });
            }
        });
    } else {
        res.status(401).json({ message: "Token must be a Bearer token" });
    }
}