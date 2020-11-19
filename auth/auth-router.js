const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { jwtSecret } = require("./secret");

const Users = require("../users/users-model");
const { isValid } = require("../users/users-service");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide a username and a password. Your password should be alphanumeric",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user); // make token
          res.status(200).json({ message: "Welcome to our API", token }); // send it back
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
    foo: 'bar',
  };
  const options = {
    expiresIn: '1 hour',
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
