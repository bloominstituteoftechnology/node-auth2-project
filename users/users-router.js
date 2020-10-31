const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const Users = require('./users-model')
const jwt = require("jsonwebtoken")

router.get("/users", async (req,res,next) => {
    try {
        const user = await Users.find()
        res.json(user)
    } catch (err) {
        next(err)
    }
})

router.post("/register", async (req,res,next) => {
    try {
        const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		

        if (user) {
            return res.status(409).json({
                message: 'username taken'
            })
        }

        const addUser = await Users.add({
            username,
            password: await bcrypt.hash(password, 14)
        })


        res.status(201).json(addUser)
    } catch(err) {
        next(err)
    }
})

router.post('/login', async (req,res,next) => {
    try {
        const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
        
        if(!user) {
            return res.status(401).json({
                message:"invalid user"
            })
        }
        
        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword) {
            return res.status(401).json({
                message:"invalid"
            })
        }

        const token = jwt.sign({
            userID: user.id,
            userName: user.username
        }, process.env.JWT_SECRET)

        res.cookie("token", token)

        res.json({
            message: `Welcome ${user.username}`
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router
