const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../users/users-model')

router.post("/register", validateRoleName, (req, res, next) => {
  
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash
  User.add(user)
    .then(newUser => {
      res.status(201).json(newUser)
      next()
    })
    .catch(err => {
    res.status(500).json({message: err.message})
  })
});

router.post("/login", checkUsernameExists, (req, res, next) => {
  
  let { username, password } = req.body
  
  User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user)

        res.status(200).json({message: `${user.username} is back!`, token})
      } else {
        next({status: 401, message: 'Invalid credential'})
    }
    }).catch(err=>{
    res.status(500).json({message: err.message})
  })
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }
  const options = {
    expiresIn: "24h"
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
