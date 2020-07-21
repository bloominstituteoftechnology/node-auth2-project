const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const express = require("express");

const router = express.Router();

const Users = require("./users-model");
const secrets = require("../config/secrets");
const restricted = require("./restricted-middleware");

router.get("/users", restricted, (req, res, next) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get the users" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .then((user) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          token,
        });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcryptjs.hashSync(user.password, 12);

  user.password = hash;

  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
