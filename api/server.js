const express = require('express')
const server = express()
const userRouter = require('../api/users/user-router')

server.use(express.json())
server.use('/api/users', userRouter)


module.exports = server