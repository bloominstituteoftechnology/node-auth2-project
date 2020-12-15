
const jwt = require("jsonwebtoken")
const { secret } = require("../../config/secrets.js")

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).json('you need a key!')
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).json(`the key is no good, ${err.message} `)
            } else {
                req.decodedToken = decoded

                next()
            }
        })
    }
};

