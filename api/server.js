const express = require('express');
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/authRouter.js')
const authMiddleware = require('../auth/authMiddleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", authMiddleware, usersRouter);
server.use("/api/auth", authRouter);
server.get('/', (req, res) => {
    res.json({api: 'server is up & running'});
})

module.exports = server; 