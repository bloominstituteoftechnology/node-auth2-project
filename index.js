const express = require('express')
const userRouter = require('./users/users-router')
const cookieParser = require("cookie-parser")
const server = express()
const session = require("express-session")
require("dotenv").config();
const port = process.env.Port || 4000
server.use(cookieParser())

server.use(express.json())

server.use(userRouter)
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "my secret"
}))
server.use((err,req,res,next) => {
    console.log(err)
    res.status(500).json({
        message:"something went wrong"
    })
})

server.listen(port, () => {
    console.log('we are up and running')
})