const express = require("express")
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 8000;
const usersRouter = require("./users/usersRouter")
const server = express()
const session = require("express-session")

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET
}))
server.use("./users", usersRouter)

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`)
})