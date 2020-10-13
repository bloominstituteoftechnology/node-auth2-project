const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { isValid } = require("../users-routes/user-service");
const Users = require("../users-routes/user-model");
const Secret = require("./secret");

router.post("/register", (req, res) => {
  const credentials = req.body;

  const hash = bcrypytjs.hashSync(credentials.password, 10);
  credentials.password = hash;

  Users.add(credentials)
    .then((resp) => {
      res.status(201).json({ Data: resp });
    })
    .catch((err) => {
      res.status(500).json({ Message: err.message });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })

      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = getJwt(user);

          res.status(200).json({ Welcome: user.username, token: token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ Message: "No such Username", Error: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username and password and the password should be alphanumeric",
    });
  }
});

function getJwt(user) {
  const payload = {
    username: user.username,
    role: user.role,
  };
  const secret = Secret.secret;
  const options = {
    expiresIn: "1day",
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
