const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const dbConfig = require("../data/db-config");
const Users = require("../users/usersModel.js");
const usersModel = require("../users/usersModel.js");

router.post("/register", (req, res) => {
    const user = req.body;

    if(!(user.username && user.password && user.department)) {
        res.status(400).json({ message: "Missing required data: username, password, department" });
    } else {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.add(user)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => res.status(500).json({ message: "Error adding user to database" }));
    }
});

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    if(!(username && password)) {
        res.status(400).json({ message: "Missing username and/or password" });
    } else {
        Users.findBy({ username })
            .then(user => {
                const token = generateToken(user);
                res.status(200).json({loggedon: user.username, token});
            })
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    };

    const options = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;