module.exports = department => {
    return function (req, res, next) {
        if (req.decodedJWT.department && req.decodedJWT.department === department) {
            next()
        } else {
            res.status(403).json({ message: 'NO!' })
        }
    }
}