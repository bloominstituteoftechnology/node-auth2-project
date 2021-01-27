const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("./users/users-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api", usersRouter);

module.exports = server;
