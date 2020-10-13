const express = require("express")
const cors = require("cors")
const server = express()
const session = require("express-session")
const usersRouter = require("./users/users-router")
require("dotenv").config();

const port = process.env.PORT || 6000

server.use(cors())
server.use(express.json())
server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "keep it secret"
}))

server.use("/api", usersRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
    console.log("server is running at 6000")
})