const express = require("express");
const authRouter = require("./auth/authRouter");
const usersRouter = require("./users/usersRouter");

const server = express();
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
