const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const Users = require('../users/users-model');
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

router.post("/register", validateRoleName, async (req, res, next) => {
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
  const credentials = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = await bcryptjs.hashSync(credentials.password, rounds);
  credentials.password = hash;
  Users.add(credentials)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
});

router.post("/login", checkUsernameExists, async (req, res, next) => {
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
    const { username, password } = req.body;
    const [User] = await Users.findBy({username:username})

    if (User && bcryptjs.compareSync(password, User.password)) {
      const token = buildToken(User);
        res.status(200).json({
          message: `${User.username} is back!`,
          token: token
      })
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }

  // Users.findBy({username})
  //   .then(([user]) => {
  //     if (user && bcryptjs.compareSync(password, user.password)) {
  //       const token = buildToken(user);
  //       res.status(200).json({
  //         message: `${user.username} is back!`,
  //         token: token
  //     })
  //   }}
  //   )
  //   .catch(err => {
  //     res.status(500).json({ message: err.message });
  //   })
});


function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_name: user.role_name
  }
  const config = {
    expiresIn: '1d',
  }
  return jwt.sign(
    payload, JWT_SECRET, config
  )
}

module.exports = router;
