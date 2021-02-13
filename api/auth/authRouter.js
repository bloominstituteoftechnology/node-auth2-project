const router = require("express").Router();
const Users = require("./authModel");

router.get("/", (req, res) => {
  res.status(200).json({ message: "auth" });
});

module.exports = router;
