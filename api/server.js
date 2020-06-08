const express = require('express')
const userRouter = require('../users/user-router.js')

const server = express()

server.use(express.json())
server.use('/api', userRouter)

server.get('/', (req, res) => {
    res.send('Server is Running..')
})

module.exports = server