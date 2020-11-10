const jwt = require("jsonwebtoken");
const {jwtSecret} = require('./secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message: "Please provide a valid token"});
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if(err){
            console.log('decoded error ->', err);
            return res.status(401).json({message: 'Bad token'});
        }

        console.log('decoded token ->', decoded);
        next();
    });
};