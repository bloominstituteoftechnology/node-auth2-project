const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("../users/usersRouter.js");
const authRouter = require("../auth/authRouter.js");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => res.json({ api: "up" }));

module.exports = server;