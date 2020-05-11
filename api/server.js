const express = require("express");
const usersRouter = require("../users/users-router");

const server = express();

server.use(express.json());
server.use("/users", usersRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Welcome</h1>`);
});

module.exports = server;
