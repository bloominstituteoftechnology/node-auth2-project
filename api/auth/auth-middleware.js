const { JWT_SECRET } = require("../secrets"); // use this secret!
const User = require('../users/users-model')
const jwt = require('jsonwebtoken')

const restricted = (req, res, next) => {
  const token = req.header.authorization
  
  if (!token) {
    res.status(401).json({message: 'Token required'})
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({message: 'Token invalid'})
      } else {
        req.decodedToken = decoded
        next()
      }
    })
  }
}

const only = role_name => (req, res, next) => {
  if (!req.decodedToken.role_name === role_name) {
    res.status(403).json({message: 'This is not for you'})
  } else {
    next()
  }
}


const checkUsernameExists = async (req, res, next) => {
  try {
    const user = await User.findBy({ username: req.body.username })
    if (!user) {
      res.status(401).json({message: 'Invalid credentials'})
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}


const validateRoleName = (req, res, next) => {
  
  if (req.body.role_name || req.body.role_name.trim()) {
    req.role_name = 'student'
    next()
  } else if (req.body.role_name.trim === 'admin') {
    res.status(422).json({message: 'Role name can not be admin'})
  } else if (req.body.role_name.trim.length > 32) {
    res.status(422).json({message: 'Role name can not be longer than 32 chars'})
  } else {
    req.role_name = req.body.role_name.trim()
    next()
  }
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}
