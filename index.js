require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const server = express()
const port = process.env.PORT || 4000

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use(cookieParser())

server.use((err,req,res,next) => {
    console.log(err)
    res.status(500).json({
        message: "Something Went Wrong"
    })
})

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})