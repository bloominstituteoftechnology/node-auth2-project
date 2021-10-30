const router = require("express").Router();
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const jwt = require('jsonwebtoken')

router.post("/register", validateRoleName, (req, res, next) => {
    const {username, password} = req.body
    const hash = bcrypt.hashSync(password, 8)
    const role_name = 'student'
    User.add({username, password: hash, role_name})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});


router.post("/login", checkUsernameExists, (req, res, next) => {
  let {username, password} = req.body
  User.findBy({username})
  .then(([user]) => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = makeToken(user)
      res.status(200).json({message: '/bob is back/', token})
    }else{
      next({status: 401, message: 'Invalid credentials'})
    }
  })
  .catch(next)
});

function makeToken(user){
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
