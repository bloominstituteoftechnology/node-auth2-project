module.exports = (role)=>{
    return function(req, res, next){
        if(req.decodedJwt.roles && req.decodedJwt.roles.includes(role))
        {next();
    } else if (req.decodedJwt.roles && req.decodedJwt.roles.includes(ADMIN)){
        next();
    } else{
        res.status(403).json({you: "dont have permission"})
        }
    }
}