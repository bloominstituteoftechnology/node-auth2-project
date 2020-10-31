const express = require('express')
const userRouter = require('./users/users-router')

const server = express()

const port = process.env.Port || 4000

server.use(express.json())

server.use(userRouter)

server.use((err,req,res,next) => {
    console.log(err)
    res.status(500).json({
        message:"something went wrong"
    })
})

server.listen(port, () => {
    console.log('we are up and running')
})