const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const Users = require('../users/users-model')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../secrets');


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
router.post("/register", validateRoleName,  (req, res, next) => {
    let user = req.body
   //bcrypt the password before saving
    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcrypt.hashSync(user.password, rounds)
    //never save the plain text password in the db
    user.password = hash
    Users.add(user)
      .then(saved => {
        res.status(201).json({
          message: `Great to have to, ${saved.username}`
        })
      })
        .catch(next)
});


router.post("/login", checkUsernameExists, async (req, res, next) => {
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
  try {
    const options = {
      expiresIn: '1d',
    }

    const payload = {
      subject: req.params.user_id,
      username: req.params.username,
      role_name: req.params.role_name,
    }

    const token = jwt.sign(payload, JWT_SECRET, options)

    res.status(200).json({
      message: `${req.user.username} is back!`,
      token: token,
    })

  } catch (err) {
    next(err)
  }
});

module.exports = router;