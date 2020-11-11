
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
require('colors')

const userRouter = require('./router/user-router.js')
const authRouter = require('./auth/auth-router.js')

const server = express()
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)
server.get("/", (req, res) => {
    res.json({ api: "up and running" })
  })


module.exports = server