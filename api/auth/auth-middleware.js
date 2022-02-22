const { JWT_SECRET } = require("../secrets"); // use this secret!
const jwt = require('jsonwebtoken')
const UM = require('../users/users-model')

/*
    If the user does not provide a token in the Authorization header:
    status 401
    {
      "message": "Token required"
    }

    If the provided token does not verify:
    status 401
    {
      "message": "Token invalid"
    }

    Put the decoded token in the req object, to make life easier for middlewares downstream!
  */
const restricted = (req, res, next) => {
  const token = req.headers.authorization
      if(!token) {
        return next({ status: 401, message: 'Token required' })
      } 
      jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          next({ status: 401, message: 'Token Invalid' })
        } else {
          req.decodedJwt = decodedToken
          next()
        }
      })
}

  /*
    If the user does not provide a token in the Authorization header with a role_name
    inside its payload matching the role_name passed to this function as its argument:
    status 403
    {
      "message": "This is not for you"
    }

    Pull the decoded token from the req object, to avoid verifying it again!
  */
const only = role_name => (req, res, next) => {
  const token = req.decodedJwt
    if (token.role_name !== role_name) {
      next({ status: 403, message: 'This is not for you' })
    } else {
      next()
    }
}

  /*
    If the username in req.body does NOT exist in the database
    status 401
    {
      "message": "Invalid credentials"
    }
  */
const checkUsernameExists = async (req, res, next) => {
  const { username } = req.body
  const user = await UM.findBy({ username })
    if(!user) {
      res.status(401).json({
        status: 401,
        message: 'Invalid credentials',
      })
    } else {
      next()
    }
}
    

  /*
    If the role_name in the body is valid, set req.role_name to be the trimmed string and proceed.

    If role_name is missing from req.body, or if after trimming it is just an empty string,
    set req.role_name to be 'student' and allow the request to proceed.

    If role_name is 'admin' after trimming the string:
    status 422
    {
      "message": "Role name can not be admin"
    }

    If role_name is over 32 characters after trimming the string:
    status 422
    {
      "message": "Role name can not be longer than 32 chars"
    }
  */
const validateRoleName = (req, res, next) => {
    const roles = req.body
    if(!roles.role_name || roles.role_name.trim() === ""){
      roles.role_name = "student"
      next()
    } else if(roles.role_name.trim() === "admin"){
      res.status(422).json({message: "Role name can not be admin"})
    } else if(roles.role_name.trim().length > 32){
      res.status(422).json({message: "Role name can not be longer than 32 chars"})
    } else{
      roles.role_name = roles.role_name.trim()
      next()
    }
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}