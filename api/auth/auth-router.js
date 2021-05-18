const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')
const buildToken = require('./token-builder')

router.post("/register", (req, res, next) => {
  const {username, password, role_name} = req.body
  const hash = bcrypt.hashSync(password, 8);
  User.add({username, password: hash, role_name})
    .then(saved => {
      res.status(201).json({
        message: `great to have you, ${saved.username}`
      })
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
