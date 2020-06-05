const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

const Auth = require('./auth-model')

const router = express.Router()

router.post('/register', async (req, res) => {
    let body = req.body
    const hash = bcrypt.hashSync(body.password, 10)
    body.password = hash
    try {
      const user = await Auth.add(body)
      res.status(201).json(user)  
    } catch(e) {
        res.status(500).json({ message: 'db error' })
    }
})

router.post('/login', async (req, res) => {
    let { username, password } = req.body
    try {
        const user = await Auth.findBy(username).first()
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({message: 'welcome to the jungle, ' + username, token })
        } else {
            res.status(401).json({ message: 'wrong credentials' })
        }
    } catch(e) {
        res.status(500).json({ message: 'db error' })
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    }

    const options = {
        expiresIn: "2h"
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router