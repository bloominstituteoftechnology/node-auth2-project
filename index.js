const server = require("./server")

server.get('/',(req,res)=>{
    res.status(200).json({INDEX: "API WORKING"})
})