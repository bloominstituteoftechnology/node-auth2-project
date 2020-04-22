const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const authMiddleware = require("../auth/auth-middleware");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", authMiddleware, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.send("API running..");
});

module.exports = server;