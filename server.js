const express = require("express");

const UsersRouter = require("./routes/userRouter.js");

const server = express();

server.use(express.json());

server.use("/api/user", UsersRouter);

module.exports = server;
