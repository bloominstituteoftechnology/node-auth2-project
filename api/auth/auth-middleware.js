const { JWT_SECRET } = require("../secrets"); // use this secret!
const jwt = require("jsonwebtoken")
const {findBy} = require("../users/users-model.js")

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).json({message:"Token required"})
    } else {
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if (err) {
                res.status(401).json({message:"Token invalid"})
            } else {
                req.decodedToken = decoded
                next()
            }
        })
    }
}

const only = role_name => (req, res, next) => {
    const valid = Boolean(req.decodedToken.role_name && req.decodedToken.role_name === role_name);
    if (valid) {
        next();
    } else {
        res.status(403).json({message: 'This is not for you'});
    }
}


const checkUsernameExists = async (req, res, next) => {
    const {username} = req.body
    if (!username){
        res.status(401).json({message:"Invalid credentials"})
    } else {
        const user = await findBy({username})
        if (!user){
            res.status(401).json({message:"Invalid credentials"})
        } else {
            next()
        }
    }
}


const validateRoleName = (req, res, next) => {
    if (req.body.role_name){
        if (req.body.role_name.trim().length > 32){
            res.status(422).json({message:"Role name can not be longer than 32 chars"})
        } else if (req.body.role_name.trim() == "admin"){
            res.status(422).json({message:"Role name can not be admin"})
        } else {
            req.role_name = req.body.role_name.trim()
            next()
        }
    } else {
        req.role_name = "student"
        next()
    }
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}
