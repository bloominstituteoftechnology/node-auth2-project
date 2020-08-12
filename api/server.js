const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const restricted = require('../auth/restrictedMiddleware')
const authRouter = require('../auth/authRouter')
const usersRouter = require('../api/users/usersRouter')




const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
// server.use(session(sessionConfig));

server.use('/api/users', restricted, usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req, res) => {
    res.send({ api: "is up" })
})

module.exports = server;