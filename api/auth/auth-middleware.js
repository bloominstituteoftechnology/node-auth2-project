const { JWT_SECRET } = require("../secrets"); // use this secret!
const jwt = require("jsonwebtoken")
const { findBy } = require("../users/users-model")

const restricted = async (req, res, next) => {
  try {
    const token = req.cookies.token
      if(!token) {
        res.status(401).json({message: "Token required"})
      }

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({message: "Token invalid"})
        }

        req.token = decoded
        next()
      })

    } catch(err) {
      next(err)
    }
}

const only = role_name => (req, res, next) => {
  if(!req.token.role_name || !req.token.role_name !== role_name) {
    return res.status(403).json({message: "This is not for you"})
  
  } else {
    next()
  }
}


const checkUsernameExists = async (req, res, next) => {
    const username  = req.body
    const existingUser = await findBy({username}).first()
      if(!existingUser) {
        return res.status(401).json({message: "Invalid Credentials"})
      
    } else {
      req.existingUser = existingUser
      next()
    }
}


const validateRoleName = (req, res, next) => {
    const role = req.body.role_name
    if (!role || role.length < 1) {
      req.role_name = "student"
      next()

    } else if(role === "admin") {
      return res.status(422).json({message: "Role name can not be admin"})

    } else if(role.length > 32) {
      return res.status(422).json({message: "Role name can not be longer than 32 chars"})
    }
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}
