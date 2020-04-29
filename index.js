const express = require("express");
const status = require("http-status-codes");
const db = require("./data/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const checkCreds = require("./middleware/checkCredentialsExist");

const server = express();
server.use(express.json());

server.post("/api/register", checkCreds, (req, res) => {
    db("users")
        .insert({
            ...req.credentials,
            password: bcrypt.hashSync(req.credentials.password, 11),
        })
        .then(() => {
            res.sendStatus(status.OK);
        })
        .catch(() => {res.status(status.INTERNAL_SERVER_ERROR).json({error: "Error registering user"})})
});

server.post("/api/login", checkCreds, (req, res) => {
    db("users")
        .where({username: req.credentials.username})
        .first()
        .then(res2 => {
            if (res2 && bcrypt.compareSync(req.credentials.password, res2.password)) {
                const token = jwt.sign(res2, "topsecret", {expiresIn: "12h"});
                res.status(status.OK).json({message: "logged in!", token});
            } else {
                res.status(status.UNAUTHORIZED).json({error: "You shall not pass"});
            }
        })
        .catch(() => {res.status(status.UNAUTHORIZED).json({error: "You shall not pass"})})
});

server.get("/api/users", (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, "topsecret");
        db("users")
            .where({username: decoded.username})
            .first()
            .then(user => {
                if (user && user.password === decoded.password) {
                    return db("users")
                        .where({department: decoded.department})
                        .select("username", "department");
                } else {
                    res.status(status.UNAUTHORIZED).json({error: "You shall not pass"});
                }
            })
            .then(users => {
                res.status(status.OK).json(users);
            })
            .catch(() => {res.status(status.UNAUTHORIZED).json({error: "You shall not pass"})});
    } catch {
        res.status(status.UNAUTHORIZED).json({error: "You shall not pass"})
    }
});

server.listen(5000, () => {
    console.log("server listening on port 5000");
});