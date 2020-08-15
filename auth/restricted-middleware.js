const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");


module.exports = (req, res, next) => {

    try {

// add code here to verify users are logged in (10)
  //********************* REMEMBER TO SPLIT*********** */
  //const [authType, token] = req.headers.authorization.split(" ");
        const token = req.headers.authorization;

        if (token) {
            jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
                if(err) {
                    res.status(401).json({ message: "YOU SHALL NOT PASS!" });
                } else {
                    req.decodedJwt = decodedToken;
                    console.log(req.decodedJwt);
                    next();
                }
            })
        } else {
            throw new Error('invalid auth data');
        }
    } catch(err) {
        res.status(401).json({ error: err.message });
    }

};
