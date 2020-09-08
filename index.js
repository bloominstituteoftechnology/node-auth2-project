const express = require("express")
const userRouter = require("./user/user-routes")


const server = express()

server.use(express.json())
server.use(userRouter)

const port = process.env.PORT || 4000

server.use("/", (req,res)=>{
    res.json({
        message: "welcome"
    })
})
server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})