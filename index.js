const express = require("express")
const server = express()
const port = process.env.PORT || 5000
const userRouter = require("./users/users-router")

server.use(express.json())
server.use(userRouter)



server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})