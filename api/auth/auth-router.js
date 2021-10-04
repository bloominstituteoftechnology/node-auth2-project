const bcrypt = require("bcryptjs");
const router = require("express").Router();
const User = require("../users/users-model")
const { checkPayload, checkUserExists } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!

router.post("/register", validateRoleName, (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10)
    const newUser = await User.add({ username: req.body.username, password: hash, role_name: req.body.role_name })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
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
    try {
      const verified = bcrypt.compareSync(req.body.password, req.userData.password)
      if(verified){
        req.session.user = req.userData
        res.json(`Welcome back ${req.userData.username}`)
      } else {
        res.status(401).json("username or password are incorrect")
      }

    } catch (error) {
      res.status(500).json({ message: error.message })
    }
});

router.get("/logout", (req, res) => {
  if(req.session){
    req.session.destroy(e => {
      if(e){
        res.json('Cant log out' + e.message)
      } else {
        res.json("logged out successfully!")
      }
    })
  }else {
    res.json("session does not exist")
  }
})


module.exports = router;
