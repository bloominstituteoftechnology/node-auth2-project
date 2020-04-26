module.exports = (role) => { // middleware function that creates  mdw functions
    return function (req, res, next) {
        if (req.decodedJwt.roles && req.decodedJwt.roles.includes(role)) {
            next();
        //     // we could assume that having 'ADMIN' is enough to do everything,
        //     // even if a specific route handler isn't looking for it...
        } else if (req.decodedJwt.roles && req.decodedJwt.roles.includes(req.decodedJwt.roles)) {
            console.log(req.decodedJwt.roles, "req.decodedJwt.roles")
            next();
            
        } else {
            res.status(403).json({ you: "don't have permission" });
        }
    }
}