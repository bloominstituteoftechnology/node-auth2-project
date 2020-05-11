const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

const server = express();

server.use(express.json());
server.use(cookieParser());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Welcome</h1>`);
});

module.exports = server;
