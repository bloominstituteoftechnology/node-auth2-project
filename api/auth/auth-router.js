const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const { jwtSecret } = require('../../config/secrets')

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          // I produce a token containing info about the user (id)
          // I am not going to remember anything about you the user
          // your data is in the token I am sending you the client
          // i can verify the integrity of the token (signature) when it comes back
          // i can check that the token hasn't expired
          // don't forget to send me the token!!!!!
          const token = makeToken(user);

          res.status(200).json({
            message: "Welcome to our API, " + user.username,
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function makeToken(user) {
  // we use a lib called jsonwebtoken
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  }
  const options = {
    expiresIn: '900s',
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
