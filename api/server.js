require("dotenv").config();
const express = require("express");

const configMiddleware = require("./configMiddleware.js");
const routerApi = require("./api.js");

const server = express();
configMiddleware(server);

server.use("/api", routerApi);

server.get("/", (req, res) => {
  res.send("server is up and running");
});

module.exports = server;
