const express = require('express')
const jwt = require('jsonwebtoken')
const Users = require('../users/user-model.js')
const secret = require('../config/secrets.js')
const restricted = require('../auth/restricted.js')


const router = express.Router()
const bcrypt = require('bcryptjs')

//Get Users if logged in 
router.get('/Users', restricted, async (req, res) => {
    try {
        const found = await Users.find()
        if (found) {
            res.status(200).json(found)
        } else {
            res.status(401).json('No User to Display')
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//Register New Users
router.post('/Register', async (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash
    try {
        const newUser = await Users.addUser(user)
        if (newUser) {
            res.status(201).json('New User added')

        } else {
            res.status(404).json('Unable to add new User')
        }
    }
    catch{
        res.status(500).json('Error with Database')
    }
})


//Login
router.post('/Login', async (req, res) => {
    let { username, password } = req.body

    try {
        const user = await Users.findBy({ username }).first()
        //getting hashed password using compareSync
        if (user && bcrypt.compareSync(password, user.password)) {

            //Use to Generate token after success password
            const token = generateToken(user)

            res.status(200).json({ message: `Welcome ${user.username}`, token })
        } else {
            res.status(401).json({ message: 'Invalid Cred' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
})

//Function to Generate Token
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: "2m"
    };

    return jwt.sign(payload, secret.jwtSecret, options)
}
module.exports = router