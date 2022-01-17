const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!

const User = require('../users/users-model.js')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

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
  let user = req.body
  const hash = bycrypt.hashSync(req.body.password, 10)
  user.password = hash
  User.add(user)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
});


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
  let { username, password } = req.body

  User.findBy({ username })
    .then (([user]) => {
      if(user && bycrypt.compareSync(password, user.password)) {
        const token = makeToken(user)

        res.status(200).json({
          message: `${user.username} is back!`,
          token
        })
      } else {
        res.status(401).json({ message: 'Invalid credentials' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
});

const makeToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }
  const options = {
    expiresIn: '2m'
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
