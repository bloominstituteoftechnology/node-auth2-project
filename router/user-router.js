const express = require('express')
const router = express.Router()
const Users = require('../model/user-model.js')

router.get("/users", async (req,res,next) => {
    try {
        const user = await Users.find()
        res.json(user)
    } catch (err) {
        next(err)
    }
})

router.post("/users", async (req,res,next) => {
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
            password
        })


        res.status(201).json(addUser)
    } catch(err) {
        next(err)
    }
})

router.post("/users", async (req,res,next) => {
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
            password
        })


        res.status(201).json(addUser)
    } catch(err) {
        next(err)
    }
})

module.exports = router