const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database/config')
const router = express.Router()

router.post('/api/register', (req, res, next) => {
  const credentials = req.body
  const rounds = process.env.HASHING_ROUNDS
  const hashedPassword = bcrypt.hashSync(credentials.password, rounds)
  credentials.password = hashedPassword
  db('users').insert(credentials)
      .then(() => {
          res.status(201).json({
              message: 'success'
          })
      })
    .catch(err => {
        next(err)
    })
})

router.post('/login', async (req, res, next) => {
  const authError = {
      message: 'invalid credentials'
  }
  try{
      const user = await db('users').where('username', req.body.username).first()
    if(!user) {
        return res.status(401).json(authError)
    }
    const passwordValid = await bcrypt.compare(req.body.password, user.password)
    if(!passwordValid) {
        return res.status(401).json(authError)
    }
    const tokenPayload = {
      userId: user.id,
      userDepartment: user.department
      }
    res.cookie('token', jwt.sign(tokenPayload, process.env.JWT_SECRET))
    res.json({
        message: `welcome ${user.username}`
    })
  } catch(err) {
    next(err)
  }
})

module.exports = router