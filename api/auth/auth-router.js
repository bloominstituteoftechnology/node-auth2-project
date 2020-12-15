const bcryptjs = require("bcryptjs");
const router = require("express").Router()
const Users = require("../users/user-model.js")
const jwt = require('jsonwebtoken');
const { secret } = require("../../config/secrets.js")

router.post("/register", (req, res) => {
    const theGoods = req.body;
    if (theGoods.username && theGoods.password) {
        const hash = bcryptjs.hashSync(theGoods.password, 7)
        theGoods.password = hash;
        Users.add(theGoods)
            .then(user => {
                res.status(201).json(user)
            }).catch(e => res.status(500).json(e.message))
    } else {
        res.status(400).json("we need a username and a password")
    }
})

router.post("/login", (req, res) => {
    const theGoods = req.body
    if (theGoods.username && theGoods.password) {
        const { password, username } = theGoods
        Users.getBy({ username: username })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = tokenMaker(user)
                    res.status(200).json(`here is your token ${token}`)
                } else {
                    res.status(401).json("can't sit here")
                }
            }).catch(e => res.status(500).json(e.message))
    } else {
        res.status(401).json("login not do right it?!")
    }

})

function tokenMaker(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: "1000s",
    }
    return jwt.sign(payload, secret, options)
}
module.exports = router
