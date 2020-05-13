require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const server = express()
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const port = process.env.PORT || 4040

server.use(express.json())
server.use(cookieParser())
server.use('/users', usersRouter)
server.use('/auth', authRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'Internal Error'
    })
})

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})