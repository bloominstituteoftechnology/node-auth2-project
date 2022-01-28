const router = require("express").Router();
const bcrypt = require('bcryptjs')
const tokenBuilder = require('./helpers')
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { BCRYPT_ROUNDS } = require("../secrets"); // use this secret!

const User = require('./../users/users-model')

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

  const { username, password/* , role_name  */ } = req.body
  const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS)
  const role = req.role_name
  try {
    const newUser = await User.add({ username, password: hash, role_name: role })
    res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
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

  try {
    let user = req.user
    let { password } = req.body

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = tokenBuilder(user)
      res.json({ message: `${user.username} is back!`, token })
    } else {
      next({ status: 401, message: 'Invalid Credentials' })
    }
  } catch (err) {
    next(err)
  }
});

module.exports = router;
