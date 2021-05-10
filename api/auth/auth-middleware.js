const { JWT_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken")
const { findBy } = require("../users/users-model")

const restricted = () => {
  return async (req, res, next) => {
    try {
      //if no token
      const token = req.cookies.token
      if(!token){
        return res.status(401).json({
          message: "Token required"
        })
      }

      //verify token
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
          return res.status(401).json({
            message: "Token invalid"
          })
        }

        //so other functions can access the token
        req.token = decoded

        next()
      })
    } catch(err){
        next(err)
    }
  }
}

const only = role_name => () => {
  const roleScale = ["student", "instructor", "admin"]

  return async (req, res, next) => {
    try {
      const token = req.cookies.token
      if(!token) {
        return res.status(401).json({
          message: "Invalid credentials"
        })
      }

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
          return res.status(401).json({
            message: "Invalid credentials"
          })
        }

        if(role_name && roleScale.indexOf(decoded.user_role) < roleScale.indesOf(role_name)){
          return res.status(403).json({
            message: "This is not for you"
          })
        }
      })

      req.token = decoded

      next()
    } catch(err) {
        next(err)
    }
  }
}


const checkUsernameExists = () => {
  return async (req, res, next) => {
    try {
      // const { username } = req.body
      // const user = await findBy({ username })

      // if(user) {
      //   res.status(401).json({
      //     message: "Username already exists"
      //   })
      // }

      if(!req.body.username){
        res.status(401).json({
          message: "Invalid credentials"
        })
      }
      next()
    } catch(err) {
        next(err)
    }
  }
}


const validateRoleName = () => {
  return async (req, res, next) => {
    const { role_name } = req.body
    const role = role_name.trim()

    try {
      if(!role || role === ""){
        req.body.role_name = "student"
        next()
      }

      if(role === "admin"){
        res.status(422).json({
          message: "Role name can not be admin"
        })
      }

      if(role.length > 32){
        res.status(422).json({
          message: "Role name can not be longer than 32 chars"
        })
      }

      req.body.role_name = role
      next()
    } catch(err){
        next(err)
    }
  }
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}
