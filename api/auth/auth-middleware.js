const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../secrets"); // use this secret!
const {findBy} = require('../users/users-model');

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    next({message: "Token required", status: 401})
  } else {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        next({message: "Token invalid", status: 401});
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  }
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
}

const only = role => (req, res, next) => {
  const {role_name} = req.decodedToken;
  if (role_name !== role) {
    next({message: "This is not for you", status: 403});
  } else {
    next();
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
}


const checkUsernameExists = async (req, res, next) => {
  const {username} = req.body;
  const [user] = await findBy({username});
  if (!user) {
    next({message: "Invalid credentials", status: 401});
  } else {
    req.body.user = user;
    next();
  }

  /*
    If the username in req.body does NOT exist in the database
    status 401
    {
      "message": "Invalid credentials"
    }
  */
}


const validateRoleName = (req, res, next) => {
  if (req.body.role_name) {
    req.body.role_name = req.body.role_name.trim();
    if (req.body.role_name === "admin") {
      next({message: "Role name can not be admin", status: 422});
    }
  
    if (req.body.role_name.length > 32) {
      next({message: "Role name can not be longer than 32 chars", status: 422});
    }
    next();
  } else if (!req.body.role_name || req.body.role_name.trim() === '') {
    req.body.role_name = "student"
    next();
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
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}