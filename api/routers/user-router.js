const router = require("express").Router();

const UserTbl = require("../../database/db-models/user-model.js");

router.get("/", (req, res) => {
  const department = req.decodedToken.roles;

  UserTbl.getUsers(department)
    .then((userList) => {
      res.send(userList);
    })
    .catch((err) => {
      res.status(500).json({ message: "error retrieving users" });
    });
});
module.exports = router;
