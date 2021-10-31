const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require("../users/users-model.js");
const { default: jwtDecode } = require("jwt-decode");

router.post("/register", validateRoleName, (req, res, next) => {
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
  let user = req.body;
  // Make sure role_name is defined by taking from middleware req object
  user.role_name = req.role_name; 
  // bcrypt the password before saving
  const rounds = process.env.BCRYTPT_ROUNDS || 12;
  const hash = bcrypt.hashSync(user.password, rounds);

  // save the hashed password into the database
  user.password = hash;

  // save the user
  Users.add(user)
    .then(saved => {
      res.status(201).json({ message:  `Great to have you,  ${saved.username}` });
    })
    .catch(next); // the custom err handling middleware will catch this

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
  console.log("In the router.post")
  let { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      console.log("user:", user);
      if (user && bcrypt.compareSync(password, user.password)) {
        // create a token
        const token = makeToken(user);
        console.log(jwtDecode(token));
        res.status(200).json({ message: `${user.username} is back`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(next);
});


function makeToken(user){
  const payload = {
    subject:user.user_id,
    username:user.username,
    role_name:user.role_name,
  }
  const options = {
    expiresIn: "500s"
  }
  console.log("make token:", jwt.sign(payload,JWT_SECRET,options))
  return jwt.sign(payload,JWT_SECRET,options)
}

module.exports = router;
