const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');

module.exports = (req, res, next) => {
    //tokens are normally sent as the authorization header
    const token = req.headers.authorization;

    const secret = secrets.jwtSecret;

     if (token) {
    //verify that the token is valid
    jwt.verify(token, secret, (err, decodedToken) => {
        // if everything is good with the token, the error will be undefined
        if(err) {
            res.status(401).json({you: "cannot pass"})
        } else {
            req.decodedToken = decodedToken;

            next();
        }
    });
} else {
        res.status(400).json({message: 'Please provide credentials'})
        console.log(token);
        console.log(req.headers)
    }
}; 