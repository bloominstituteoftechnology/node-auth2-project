const router = require("express").Router();
const restricted = require("../auth/restricted-middleware");

const User = require("./userModel");

router.get("/", restricted, (req, res) => {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
