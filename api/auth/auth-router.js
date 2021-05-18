const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')
const buildToken = require('./token-builder')

router.post("/register",checkUsernameExists,  validateRoleName, (req, res, next) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 8);
  const role = user.role_name || 'student'
  user.password = hash
  user.role_name = role
  User.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(next)
});


router.post("/login", (req, res, next) => {
  const {username, password} = req.body
  User.findBy({username})
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = buildToken(user)
      res.status(200).json({
        message: `${user.username} is back`,
        token
      })
    } else {
      next({
        status:401, 
        message: 'invalid credentials'})
    }
  })
  .catch(next)
});

module.exports = router;
