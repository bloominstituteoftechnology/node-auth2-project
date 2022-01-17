const { default: jwtDecode } = require("jwt-decode");
const { JWT_SECRET } = require("../secrets"); // use this secret!

const jwt = require('jsonwebtoken');
const e = require("express");

const restricted = (req, res, next) => {
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
  const token = req.body.authorization

  if (!token) {
    res.status(401).json("token needed")
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err) {
        res.status(401).json("toekn is bad:" + err.message)
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
  if(req.decodedToken.role === role) {
    next()
  } else {
    res.status(403).json({"message": "This is not for you"})
  }
}


const checkUsernameExists = (req, res, next) => {
  /*
    If the username in req.body does NOT exist in the database
    status 401
    {
      "message": "Invalid credentials"
    }
  */
  User.findBy(req.body.username)
  .then(res => {
    if(!res) {
      res.status(401).json({ "message": "Invalid credentials"})
    } else {
      next()
    }
  })
  .cathc(err => {
    res.status(500).json({ message: err.message })
  })
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
  if(!req.body.role_name || req.body.role_name === "") {
    req.body.role_name = 'student'
    req.body.role_name.trim()
    next()
  } else if (req.body.role_name === 'admin') {
    res.status(422).json({"message": "Role name can not be admin"})
  } if (req.body.role_name.trim().length > 32 ) {
    res.status(422).json({ "message": "Role name can not be longer than 32 chars"})
  }
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}
