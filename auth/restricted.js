const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(401).json({ message: "You shall not pass!" });
    } else {
        const [authType, token] = req.headers.authorization.split(" ");
    
        if(authType.toUpperCase() === "BEARER" && token) {
            jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
                if(!err) {
                    req.jwt = decodedToken;
                    next();
                } else {
                    res.status(401).json({ message: "You shall not pass!", err });
                }
            });
        } else {
            res.status(401).json({ message: "You shall not pass!" });
        }
    }
}