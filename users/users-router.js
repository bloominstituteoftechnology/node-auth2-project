const express = require('express')

const Users = require('./users-model')
const restricted = require('../auth/restricted-middleware')
const checkDepartment = require('../auth/check-department-middleware')

const router = express.Router()

router.get('/', restricted, checkDepartment('developer'), async (req, res) => {
    try {
        const users = await Users.get()
        if (users) { return res.status(200).json(users) }
        res.status(404).json({ message: 'get error' })
    } catch(e) {
        res.status(500).json({ message: 'db error' })
    }
})

router.get('/logout', (req, res) => {
    if (req.session && req.session.user) {
        req.session.destroy(err => {
            if (err) {
                return res.status(400)
            } else {
                return res.status(200)
            }
        })
    }
    res.end()
})

module.exports = router;