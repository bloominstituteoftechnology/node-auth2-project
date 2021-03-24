const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require('./Users/user-router');
const authRouter = require('./Auth/auth-router');


const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter)
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
  res.json({ message: 'API is online'});
});
module.exports = server;
