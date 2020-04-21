//set up the jwt object
const jwt = require('jsonwebtoken');

//set up secrets object
const secrets = require('../api/secrets.js');

//export function that verifies the token for the client
module.exports = (req, res, next) => {
    //set up the token object based on the requested authorization
    const token = req.headers.authorization;

    //set secret to the jsonwebtoken secret
    const secret = secrets.jwtSecret;

    //verify the token
    if(token) {
        //if the token is valid
        jqt.verify(token, secret, (error, decodedToken) => {
            //if the token is valid, error will be undefined
            if (error) {
                res.status(401).json({ message: 'Invalid token'})
            } else {
                //set the requested token to the decodedtoken
                req.decodedToken = decodedToken;
                next();
            }
        });
    //if there is an issue with the token before validation 
    } else {
        res.status(400).json({errorMessage: 'Please provide credentials.'});
    }
};