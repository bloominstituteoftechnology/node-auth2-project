const express = require('express');
const Users = require('./usersModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const { restrict } = require("./usersMiddleware")
const router = express.Router() 

router.post("/register", async (req, res, next) => {
    try {
        const {username, password, department} = req.body
        const user = await Users.findBy({username}).first()

            if (user) {
                return res.status(409).json({
                    message: "Username is already taken"
                })
            }

            const newUser = await Users.addUser({
                username,
                password: await bcrypt.hashSync(password, 15),
                department
            })
        res.status(201).json(newUser)
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const {username, password} = req.body;

        //check to see if user exists
        const user = await Users.findBy({username}).first()
        //check password
        const passAuth = await bcrypt.compare(password, user.password)
        
        //if the user doesnt exist/ password
        if (!user || !passAuth) {
            res.status(401).json({
                message: "Invalid credentials"
            })
        }
        
        const token = jwt.sign({
            userId: user.id,
            department: user.department
        }, process.env.JWT_SECRET)
        
            res.status(200).json({message: "Welcome", token: token})
        
        
    } catch(err) {
        next(err)
    }
})

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.json
            }
        })
    }
})

router.get("/users", restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch(err) {
        next(err)
    }
}) 

module.exports = router;