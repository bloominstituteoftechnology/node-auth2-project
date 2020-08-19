const router = require("express").Router();

const Users = require("./users-model.js");
const protected = require("../auth/protected-mw");

router.get("/", protected, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => res.send(err));
});

module.exports = router;
