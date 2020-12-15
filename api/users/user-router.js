const router = require("express").Router();
const Users = require("./user-model.js");
const restricted = require("../middleware/restricted.js");
const departmentChecker = require("../middleware/departmentChecker.js");

router.get("/", restricted, departmentChecker('admin'), (req, res) => {
    Users.get()
        .then(users => {
            res.status(200).json(users)
        }).catch(e => res.status(500).json(e.message))
})
module.exports = router
