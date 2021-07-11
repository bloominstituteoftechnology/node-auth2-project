const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const Users = require('../users/users-model')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../secrets');

router.post("/register", validateRoleName, async (req, res, next) => {
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
  try {
    const username = req.body.username
    const password = req.body.password
    const role_name = req.body.role_name

    const newUser = await Users.add({
      username,
      role_name,
      password: await bcrypt.hash(password, 14)
    })

    res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
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