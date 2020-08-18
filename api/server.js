const express = require('express')
const server = express()
const accountsRouter = require('../accounts/accounts-router')
const authRouter = require('../auth/auth-router')


server.use(express.json())
server.use('/api/accounts', accountsRouter)
server.use('/api/auth', authRouter )


module.exports = server;

