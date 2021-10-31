const router = require("express").Router();
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const jwt = require('jsonwebtoken')

router.post("/register", validateRoleName, (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(req.body.password, 8)
  user.password = hash
  User.add(user)
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(err => {
    res.status(500).json({message: err.message})
  })
});

router.post("/login", checkUsernameExists, (req, res) => {
  let {username, password} = req.body
  User.findBy({username})
  .then(([user]) => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = makeToken(user)
      res.status(200).json({message: `Sue is back!`, token})
    }else{
      res.status(401).json({message: 'Invalid credentials'})
    }
  })
  .catch(err => {
    res.status(500).json({message: err.message})
  })
});

function makeToken(user){
  const payload = {
    subject: user.user_id,
    username: user.username,
    role: user.role_name
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
