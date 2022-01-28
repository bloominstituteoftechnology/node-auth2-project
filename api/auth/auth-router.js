const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const {tokenBuilder} = require('./auth-token')
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')

router.post("/register", validateRoleName, (req, res, next) => {

  const user = {
    username: req.body.username,
    password: req.body.password,
    role_name: req.role_name
  }
  
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash

  User.add(user)
    .then(u => {
      res.status(201).json({
        user_id: u.user_id,
        username: u.username,
        role_name: u.role_name
      })
    })
    .catch(next)

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
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenBuilder(user)
        res.status(200).json({ message: `${user.username} is back!`, token })
      } else {
        next({ status: 401, message: 'Invalid Credentials' })
      }
    })
    .catch(next)
    


});

module.exports = router;
