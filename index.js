const express = require('express')

const server = express()
const dotenv = require('dotenv')
const mongoose =require('mongoose')

// import routes
const authRoute = require ('./routes/auth-router')
const postRoute = require('./routes/posts')

dotenv.config()

//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true }, () => console.log('connect to db'))



//middleware
server.use(express.json())

///route middleware

server.use('/api/user', authRoute)
server.use('/api/post', postRoute)
server.listen(5010, () => console.log('server is up and running on 5010'))