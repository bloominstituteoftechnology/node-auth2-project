const { JWT_SECRET } = require("../secrets"); // use this secret!
const {findBy} = require('../users/users-model')
const jwt = require('jsonwebtoken')

const restricted = async (req, res, next) => {

const token = req.headers.authorization
  if (!token) {
    return next({ status: 401, message: 'Token required'})
  } 
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      next({ status: 401, message: 'Token invalid'})
    } else {
      req.decodedToken = decodedToken
      next()
    }
  })
}

const only = role_name => (req, res, next) => {
  const {roleName} = req.decodedToken
  if (role_name === roleName) {
    next()
  } else {
    next({ status: 403, message: 'This is not for you'})
  }
}


const checkUsernameExists = async (req, res, next) => {
  try {
    const [user] = await findBy({username: req.body.username})
    if (!user) {
      next({ status: 422, message: 'Invalid credentials'})
    } else {
      req.user = user
      next()
    }
  }
  catch (err) {
    next(err)
  }
}


const validateRoleName = (req, res, next) => {
  if (!req.body.role_name || !req.body.role_name.trim()) {
    req.role_name = 'student'
    next()
  } else if (req.body.role_name.trim() === 'admin') {
    next({ status: 422, message: 'Role name can not be admin'})
  } else if (req.body.role_name.trim().length > 32) {
    next({ status: 422, message: 'Role name can not be longer than 32 characters'})
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
