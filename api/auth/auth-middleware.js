const User = require("../users/users-model")
const jwt = require("jsonwebtoken")

const { JWT_SECRET } = require("../secrets"); // use this secret!
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
  if(!token){
    res.status(401).json({message: "Token required"})
  } else {
   jwt.verify(token, JWT_SECRET, (err, decoded) => {
     if(err) {
       res.status(401).json("Token invalid", err.message)
     } else {
       req.decodedToken = decoded;
       next();
     }
   })
  }
}

const only = role_name => (req, res, next) => {
  
}
const checkPayload = (req,res,next)=>{
  if(!req.body.username || !req.body.password){
      res.status(401).json("Username and password required")
  }else{
      next()
  }
}


const checkUserExists = async (req,res,next)=>{
try{
    const rows = await User.findBy({username:req.body.username})
    if(rows.length){
        req.userData = rows[0]
        next()
    }else{
        res.status(401).json("Username does not exist")
    }
}catch(e){
    res.status(500).json(`Server error: ${e.message}`)
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
}

module.exports = {
  restricted,
  checkUserExists,
  checkPayload,
  validateRoleName,
  only,
}
