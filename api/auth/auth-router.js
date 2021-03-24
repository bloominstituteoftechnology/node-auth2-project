const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { findBy, add } = require("../users/users-model")

router.post("/register", validateRoleName, async (req, res, next) => {
  try {
    const { username, password, role_name } = req.body
    const user = await findBy({username})
    if(user) {
      return res.status(409).json({ message: "name is taken" })
    }
    const newUser = await add({
      username,
      password: await bcrypt.hash(password, 9),
      role_name
    })
    res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
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


router.post("/login", checkUsernameExists, async (req, res, next) => {
  try {
    const {username, password} = req.body
    const user = await findBy({username})
    if(!user) {
      return res.status(401).json({ message: "username does not exist, please register a username" })
    }
    const validPassword = bcrypt.compare(password, user.password)
    if(!validPassword) {
      return res.status(401).json({ message: "incorrect password" })
    }

    const token = jwt.sign({
      subject: user.user_id,
      username: user.username,
      role_name: user.role_name
    }, JWT_SECRET)

    res.cookie("token", token)
    res.json({ message:`Welcome, ${user.username}` })
  } catch(err) {
    next(err)
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
