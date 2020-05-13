const jwt = require('jsonwebtoken')

function restrict(department) {
  return async (req, res, next) => {
      const authError = {message: 'Invalid Credentials'
      }
      try {
          const token = req.cookies.token
          if(!token) {
              return res.status(401).json(authError)
          }
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err || decodedPayload.userDepartment !== department) {
            return res.status(401).json(authError)
        }
        req.token = decodedPayload
        next()
    })
    } catch(err) {
      next(err)
    }
  }
}

module.exports = restrict