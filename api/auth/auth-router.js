const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  checkUsernameExists,
  validateRoleName
} = require('./auth-middleware');
const User = require("./../users/users-model");
const { BCRYPT_ROUNDS } = require("./../../config");
const buildToken = require("./token-builder");

router.post("/register",
  validateRoleName,
  async (req, res, next) => {
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
    try {
      let user = req.body;
      const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
      user.role_name = req.role_name;
      user.password = hash;

      const newUser = await User.add(user);

      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);


router.post("/login",
  checkUsernameExists,
  async (req, res, next) => {
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
      const credentials = req.body;
      const user = await User.findBy({ username: credentials.username });
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = buildToken(user)
        res.status(200).json({
          message: `${user.username} is back!`,
          token: token
        });
      } else {
        next({
          status: 401,
          message: "Invalid credentials"
        });
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
