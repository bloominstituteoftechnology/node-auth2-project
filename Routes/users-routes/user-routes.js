const router = require("express").Router();
const Users = require("./user-model");
const restricted = require('../auth-routes/protected-middleware')

router.get("/",restricted, (req, res) => {
  Users.find()
    .then((resp) => {
      res.status(200).json({ Data: resp });
    })
    .catch((err) => {
      res.status(500).json({ Message: err.message });
    });
});

module.exports = router;
