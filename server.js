const express = require('express')
const helmet = require('helmet')
const cors = require("cors")
const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

const PORT = 5000

server.listen(PORT, ()=>{
    console.log(`API listing on ${PORT}`)
})

module.exports = server