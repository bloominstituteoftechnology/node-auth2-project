const jwt = require("jsonwebtoken"); //1 

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const secret = process.env.JWT_SECRET || 'is it secret, or safe?';
        //check that the token is valid
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                // token has been tampered with
                res.status(401).json({ message: "Invalid Credentials, You are not authorized" })
            } else {
                req.decodedJwt = decodedToken;
                next();
            }
        });
     
    } else {
        res.status(400).json({ message: "No credentials provided" })
    }
}