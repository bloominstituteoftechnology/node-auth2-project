const { JWT_SECRET } = require("../secrets"); // use this secret!
const User = require('../users/users-model')

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
  /*
    If the user does not provide a token in the Authorization header with a role_name
    inside its payload matching the role_name passed to this function as its argument:
    status 403
    {
      "message": "This is not for you"
    }

    Pull the decoded token from the req object, to avoid verifying it again!
  */
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
