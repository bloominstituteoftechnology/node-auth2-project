const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const Users = require('../users/users-model');
const { default: jwtDecode } = require("jwt-decode");



// validateRoleName,
router.post("/register", validateRoleName, (req, res, next) => {
  // encrypting the registration
  let user = req.body;
  // bcrypting the password before saving
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcrypt.hashSync(user.password, rounds)
  // overring the password as a hash
  user.password = hash

  Users.add(user)
  .then(saved => {
    res.status(201)({
      message: `Nice to meet you, ${saved.username}`
    })
  })
  .catch(next)
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
});


router.post("/login", checkUsernameExists, (req, res, next) => {

  let {username, password} = req.body;

  Users.findBy({username})
  // why set things to an array and things to an object?
  .then(([user])=> {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = makeToken(user)
      res.status(200).json({
        message: `welcome back ${user.name}`,
        token
      })
    }else{
      res.status(401).json({message: 'invalid username'})
    }
  })
  .catch(next)

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
});
function makeToken(user){
  const payload ={
    subject: user.user_id,
    username: user.username,
    role_name: user.role_name
  }
  const options = {
    expiresIn: '500s'
  }
  return jwt.sign(payload,JWT_SECRET, options )
}
module.exports = router;
