const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const User = require("../Users/user-model");
const jwt = require('jsonwebtoken');
const { isValid } = require("../Users/user-services");
const { jwtSecret } = require("../../config/secret");

//Register
router.post("/register", (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const hashRounds = 8;

    //hashing the pass
    const hash = bcryptjs.hashSync(credentials.password, hashRounds);
    credentials.password = hash;

    //save the user to the database

    User.add(credentials)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res
      .status(400)
      .json({ message: "Please provide a Username and a Password" });
  }
});

//Login

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (isValid(req.body)) {
    User.findBy({ username: username })
      .then(([user]) => {
        //compare password to hash
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user);
          res.status(200).json({
            message: "Welcome back to the API" + user.username,
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res
      .status(400)
      .json({ message: "Provide a Username and a Password for the db" });
  }
});

const makeToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };
  const options = {
    expiresIn: "5m",
  };
  return jwt.sign(payload, jwtSecret, options);
};

module.exports = router;
