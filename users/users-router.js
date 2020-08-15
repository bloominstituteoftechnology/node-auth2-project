const router = require("express").Router();
const Users = require("./users-model.js");
const checkRole = require("../auth/check-role-middleware.js");

router.get("/", (req,res) => {
    Users.find()
      .then(users => {
          res.json(users);
      })
      .catch(err => res.send(err));
});

const software = "software"
const sales = "sales"

router.get("/software", checkRole(software), (req,res) => {
    Users.find()
      .then(users => {
          console.log("welcome SWE");
          res.json({message: "Welcome SWE"});
      })
      .catch(err => res.send(err));
});


router.get("/sales", checkRole(sales), (req,res) => {
    Users.find()
      .then(users => {
        console.log("welcome Sales");
        res.json({message: "Welcome Sales"});
      })
      .catch(err => res.send(err));
});

module.exports = router;
