const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const bcrypt = require('bcryptjs')
const User = require('../users/users-model')




router.post("/register", validateRoleName, (req, res, next) => {
let user = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcrypt.hashSync(user.password, rounds)
  user.password = hash

User.add(user)
.then( res.status(201))
.catch(next)
});


router.post("/login", checkUsernameExists, (req, res, next) => {
  let {username, password} = req.body;

User.findBy({username})
  .then(([user])=> {
if(user && bcrypt.compareSync(password, user.password)){
  const token = Token(user)
    res.status(200).json({ token
})
}else{
    res.status(401).json
}
})
  .catch(next)
});



function Token(user){
  const payload ={
    subject: user.user_id,
    username: user.username,
    role_name: user.role_name
  }
  const options = {
    expiresIn: '24h'
  }
  // eslint-disable-next-line no-undef
  return jwt.sign(payload , JWT_SECRET , options )
}

module.exports = router;