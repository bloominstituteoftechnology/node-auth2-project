module.exports = (role) => {
    return function (req, res, next) {
        if (req.decodedJwt.department && req.decodedJwt.department.includes(role)) {
            next();
        } else if (req.decodedJwt.department && req.decodedJwt.department.includes('ADMIN')) {
            next();
        } else {
            res.status(403).json({ you: "don't have permission" });
        }
    }
}