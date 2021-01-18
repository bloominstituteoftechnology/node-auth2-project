const express= require('express')
const session=require("express-session")
const ConnectSessionKnex = require("connect-session-knex")(session)
// const db= require('../data/dbConfig')
const usersRouter= require('./userRouter');

const server=express()


server.use(express.json())
// server.use(cookieParser())
server.use("/",usersRouter)
server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})
// server.use(session({
//     name:"auth2",
//     cookie: {
//         maxAge: 1000 * 60 * 10  ,//goes by milliseconds (1000ms=1sec) so this session in particular will last 10 mins
//         secure: true,
//         httpOnly: true
//     },
// 	resave: false, 
// 	saveUninitialized: false, 
// 	secret: "keep it secret, keep it safe", 
// 	store: new ConnectSessionKnex({
// 		knex: db,
// 		createtable: true,
// 	}),
// }))
module.exports=server