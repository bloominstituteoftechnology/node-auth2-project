const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');
const tokenBuilder = require('../auth/token-builder');

router.post("/register", validateRoleName, (req, res, next) => {
  let credentials = req.body

  const hash = bcrypt.hashSync(credentials.password, 8);
  credentials.password = hash;

  Users.add(credentials)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch(next)
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
});


router.post("/login", checkUsernameExists, (req, res, next) => {
  const dbUser = req.user;
  const loginRequest = req.body;
 
  if(dbUser && bcrypt.compareSync(loginRequest.password, dbUser.password)) {
    const token = tokenBuilder(dbUser)

    res.status(200).json({
      message: `${dbUser.username} is back!`,
      token,
    });
  } else {
    next({ status: 401, message: "Invalid credentials"})
  }
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
});

module.exports = router;
