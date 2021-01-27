const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const Users = require("./users-model");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/router-middleware");
const { generateToken, restricted } = require("../middleware/auth-middleware");

router.post("/register", validateRegister, (req, res, next) => {
  const hash = bcryptjs.hashSync(req.body.password, 8);
  req.body.password = hash;

  Users.add(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.post("/login", validateLogin, (req, res, next) => {
  Users.findUserBy({ username: req.body.username })
    .then((user) => {
      if (user && bcryptjs.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Welcome!", token });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(next);
});

router.get("/users", restricted, (req, res, next) => {
  Users.findInDepartment(req.decodedJwt.department)
    .then((users) => {
      res.status(201).json(users);
    })
    .catch(next);
});
router.use((error, req, res, next) => {
  res.status(500).json({
    info: "There was an error in the router",
    message: error.message,
    stack: error.stack,
  });
});

module.exports = router;
