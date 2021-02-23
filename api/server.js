const express = require("express");
const server = express();
const helmet = require("helmet");
const authRouter = require("./auth/router.js");
server.use("/api/auth", authRouter);
server.use(express.json());




module.exports = server;
