const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./model");
const { restrict } = require("./middleware");

const router = express.Router();

router.get("/users", restrict("admin"), async (req, res, next) => {
    try {
        res.json(await Users.find());
    } catch (err) {
        next(err);
    }
})

router.post("/users", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findByUsername(username)

        if (user) {
            return res.status(409).json({
                Message: "Username is already taken"
            })
        }

        const newUser = await Users.add({
            username,
            password: await bcrypt.hash(password, 12),
        })
        res.status(201).json(newUser)
    } catch (err) {
        next(err);
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findByUsername(username)

        if (!user) {
            return res.status(401).json({
                Message: "Invalid credentials",
            })
        }
        //hash the password again and see if it matches what we have in the database
        const passwordValid = await bcrypt.compare(password, user.password)
        
        if (!passwordValid) {
            return res.status(401).json({
                Message: "Invalid Credentials",
            })
        }
        //generate a new session for ths user,
        //send back the session ID
        // req.session.user = user

        const token = jwt.sign({
            userId: user.id,
        userRole: user.role,}, process.env.JWT_SECRET)
        // Instruct the client to save a new cookie with this token.
        res.cookie("token", token);
        
        res.json({
            Message: `Welcome ${user.username}!`,
        })
    } catch (err) {
        next(err);
    }
})

router.get("/logout", async (req, res, next) => {
    try {
        // this will delete the session in the database and try to expire the cookie,
		// though it's ultimately up to the client if they delete the cookie or not.
        // but it becomes useless to them once the session is deleted server-side.
        req.session.destroy((err) => {
            if (err) {
                next(err)
            } else {
                res.status(204).end()
            }
        })
    } catch (err) {
        next(err);
    }
})

module.exports = router;