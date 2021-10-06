const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const bcrypt = require('bcryptjs') //require bycript>js< not just bycript
const User =  require('../users/users-model');
const { default: jwtDecode } = require("jwt-decode");

router.post("/register", validateRoleName, (req, res, next) => {
  /**
    [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }

    response:
    status 201
    {
      "user"_id: 3,
      "username": "anna",
      "role_name": "angel"
    }
   */

    const {username, password} = req.body
    const {role_name} = req
    const hash = bcrypt.hashSync(password, 8) //8^2 hashing, not too high or too slow, albeit more secure
    User.add({ username, password: hash, role_name})
      .then( newUser => {
        //console.log(newUser)
        res.status(201).json(
          //{
          // user: newUser.user,
          // username: newUser.username,
          // role_name: newUser.role_name,
          // } 
        newUser)
      })
      .catch(next)
})


// .catch(next)
//  equivalent to

// .catch (err => {
//  next(err)
//  })


router.post("/login", checkUsernameExists, (req, res, next) => {
  /**
    [POST] /api/auth/login { "username": "sue", "password": "1234" }

    response:
    status 200
    {
      "message": "sue is back!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ETC.ETC"
    }

    The token must expire in one day, and must provide the following information
    in its payload:

    {
      "subject"  : 1       // the user_id of the authenticated user
      "username" : "bob"   // the username of the authenticated user
      "role_name": "admin" // the role of the authenticated user
    }
   */
  if (bcrypt.compareSync(req.body.password, req.user.password, )) { //plain text pw versus password for comparison
    const token = buildToken(req.user)
    res.json({
      message: `${req.user.username} is back!`,
      token,
    })
  } else {
    next({status: 401, message: 'Invalid credentials'})
  }
});

function buildToken(user) {

  const payload = {
    subject: user.user_id,
    role_name: user.role_name,
    username: user.username,
  }

  const options = {
    expiresIn: 'Id',
  }

  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
