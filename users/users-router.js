const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../middleware/restricted.js");
const checkDepartment = require("../middleware/check-department.js");

router.get("/", restricted, (req, res) => {
  Users.find(req.decodedJwt.department)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

router.get("/all", restricted, checkDepartment(1), (req, res) => {
  Users.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
