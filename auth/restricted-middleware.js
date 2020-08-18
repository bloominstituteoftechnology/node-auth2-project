const jwt = require('jsonwebtoken')
const secret = require('../secrets')



module.exports = (req, res,next) => {
  const token = req.headers.authorization

  if(token){
    jwt.verify(token, secret.jwtSecret, (error, decodedToken)=>{
        if(error){
            res.status(401).json({you : 'Shall not pass'})
        } else {
            req.jwt = decodedToken
            next()
        }
    })
  } else {
      res.status(401).json({message: 'Please provide credentials'})
  }
}