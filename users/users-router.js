const express = require('express')
const router = express.Router()

const Users = require('./users-model')

router.get("/users", async (req,res,next) => {
    try {
        const user = await Users.find()
        res.json(user)
    } catch (err) {
        next(err)
    }
})

module.exports = router
