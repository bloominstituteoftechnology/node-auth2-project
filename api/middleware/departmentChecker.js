
module.exports = (role) => (req, res, next) => {

    if (req.decodedToken.department === role) {
        next()
    } else {
        res.status(403).json(' respect my authority ')
    }
}
