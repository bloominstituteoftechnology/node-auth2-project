const express = require("express");
const db = require("./users-model.js");
const router = express.Router();

const jwt = require("jsonwebtoken");

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

router.post("/api/register", (req, res) => {
    try {
        const { username, password, department } = req.body;
        
    }
});

router.post("/api/login", (req, res) => {
});

router.get("/api/users", (req, res) => {
});

module.exports = router;