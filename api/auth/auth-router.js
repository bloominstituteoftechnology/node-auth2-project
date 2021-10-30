const router = require("express").Router();
const bcrypt = require('brcryptjs')
const User = require('../users/users-model')
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!

router.post("/register", validateRoleName, (req, res, next) => {
  try{
    const hash = bcrypt.hashSync(req.body.password, 10)
    const newUser = await User.add({username: req.body.username, password: hash, role_name: req.body.role_name})
    res.status(201).json(newUser)
  }catch(err){
    res.status(500).json({message: err.message})
  }
});


router.post("/login", checkUsernameExists, (req, res, next) => {
  try{
    const verified = bcrypt.compareSync(req.body.password, req.userData.password)
    if(verified){
      req.session.user = req.userData
      res.json(`Welcome $${req.userData.username}`)
    }else{
      res.status(401).json('username or password incorrect')
    }
  }catch(err){
    res.status(500).json({message: err.message})
  }
});

router.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy(err => {
      if(err){
        res.json(`Can't log out` + err.message)
      }else{
        res.json('logged out successfully!')
      }
    })
  }else{
    res.json('session does not exist')
  }
})

module.exports = router;
