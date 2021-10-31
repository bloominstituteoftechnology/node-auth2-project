const { JWT_SECRET } = require("../secrets"); // use this secret!
const User = require('../users/users-model')
const jwt = require('jsonwebtoken');

const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if(!token){
    res.status(401).json({message: 'Token required'})
  }else{
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err){
        err.status(401).json('Token invalid')
      }else{
        req.decodedToken = decoded
        next()
      }
    })
  }
}

const only = role_name => (req, res, next) => {
  let decodedToken = req.decodedToken
  console.log(decodedToken)
  if(decodedToken.role_name !== role_name){
    res.status(403).json({message: 'This is not for you'})
  }else{
    next()
  }
}

const checkPayload = (req, res, next) => {
  if(!req.body.username || !req.body.password){
    res.status(401).json('username and password required')
  }else{
    next()
  }
}

const checkUsernameExists = async (req, res, next) => {
  User.findBy(req.body.username)
  .then(response => {
    if(!response){
      res.status(401).json({message: 'Invalid credentials'})
    }else{
      next()
    }
  })
  .catch(err => {
    res.status(500).json({message: err.message})
  })
}


const validateRoleName = (req, res, next) => {
  if(!req.body.role_name || req.body.role_name === ''){
    req.body.role_name = 'student'
    req.body.role_name.trim()
    next()
  }else if(req.body.role_name === 'admin'){
    res.status(422).json({message: 'Role name can not be admin'})
  }else if(req.body.role_name.trim().length > 32){
    res.status(422).json({message: 'Role name can not be longer than 32 chars'})
  }else{
    next()
  }
}

module.exports = {
  restricted,
  checkPayload,
  checkUsernameExists,
  validateRoleName,
  only,
}
