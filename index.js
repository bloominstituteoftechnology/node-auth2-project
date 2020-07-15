const express = require("express")
const session = require("express-session")
const Router = require("./users/router")

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())
server.use(Router)
server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
    message: "Something went wrong",
	})
})

server.get("/", (req, res, next) => {
    res.send("server running")
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})