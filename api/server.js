const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const restricted = require("../auth/restricted-middleware");

const server = express();
const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router");

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", restricted, checkDepartment("math department"), usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;

function checkDepartment(department) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.department &&
      req.decodedToken.department.toLowerCase()
       === department
    ) {
      next();
    } else {
      res.status(403).json({ you: "shall not pass" });
    }
  };
}
