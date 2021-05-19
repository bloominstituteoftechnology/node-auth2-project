const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!

router.post("/register", validateRoleName, (req, res, next) => {
  const { username, password, role_name } = req.body
  const hash = bcrypt.hashSync(
    password,
    8,
    )
    User.add({ username, password: hash, role_name})
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(next)
  
});


router.post("/login", checkUsernameExists, (req, res, next) => {
  const {password, username} = req.body;
  if (bcrypt.compareSync(password, req.user.password)) {
   req.session.user = req.user
   res.json({message: `${req.user.username} is back!`, status: 200})
  } else {
    next({ status: 401, message: 'Invalid credentials'})
  }
  
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

module.exports = router;
