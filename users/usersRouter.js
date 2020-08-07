const server = require("../api/server");

const router = require("express").Router();

const users = require("./usersModel.js");
const restricted = require("../auth/restricted.js");

router.get("/", restricted, (req, res) => {
    users.find()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ message: "Error retrieving users"}))
});

module.exports = router;