const { JWT_SECRET } = require("../secrets"); // use this secret!
const User = require('../users/users-model')
const jwt = require('jsonwebtoken')

const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if(!token){
    res.status(401).json({message: 'Token required'})
  }else{
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err){
        err.status(401).json('Token invalid', err.message)
      }else{
        req.decodedToken = decoded
        next()
      }
    })
  }
}

const only = role_name => (req, res, next) => {
}

const checkPayload = (req, res, next) => {
  if(!req.body.username || req.body.password){
    res.status(401).json('Username and password required')
  }else{
    next()
  }
}


const checkUsernameExists = async (req, res, next) => {
  try{
    const rows = await User.findBy({username: req.body.username})
    if(rows.length){
      req.userData = rows[0]
      next()
    }else{
      res.status(401).json('Invalid credentials')
    }
  }catch(err){
    res.status(500).json(`Server error: ${err.message}`)
  }
}


const validateRoleName = (req, res, next) => {
}

module.exports = {
  restricted,
  checkPayload,
  checkUsernameExists,
  validateRoleName,
  only,
}
