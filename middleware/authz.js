function authz(req, res, next) {
    console.log( req.decodedJwt.roles,'req.token.department')
    if (req.decodedJwt.roles && req.decodedJwt.roles.includes(req.decodedJwt.roles)) {
       next()
    } else {
       res.status(403).json({ message: 'wrong department' })
    }
 }
 
 
 module.exports = authz;
 