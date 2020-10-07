const express = require("express");
const db = require("./users-model.js");
const router = express.Router();

router.get("/", (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error retrieving users." });
        })
});

module.exports = router;