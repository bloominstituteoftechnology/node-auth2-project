const express = require("express");

const UsersRouter = require("./routes/users-router.js");

const server = express();

server.use(express.json());

server.use("/api/users", restricted, UsersRouter);

module.exports = server;
