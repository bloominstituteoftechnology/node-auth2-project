const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
const router = require("express").Router()
const Users = require("../model/user-model.js")
const { isValid } = require("../data/user-service.js")


const { jwtSecret } = require('./secrets')

router.post("/register", (req, res) => {
  const credentials = req.body

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8

    const hash = bcryptjs.hashSync(credentials.password, rounds)

    credentials.password = hash


    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user })
      })
      .catch(error => {
        res.status(500).json({ message: error.message })
      });
  } else {
    res.status(400).json({
      message: "username and password required",
    })
  }
})

router.post("/login", (req, res) => {
  const { username, password } = req.body

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user) 
          res.status(200).json({ message: "you have arrived", token })
        } else {
          res.status(401).json({ message: "Invalid credentials" })
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message })
      });
  } else {
    res.status(400).json({
      message: "username and password needed",
    })
  }
})

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
    foo: 'bar',
  }
  const options = {
    expiresIn: '25 seconds',
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router