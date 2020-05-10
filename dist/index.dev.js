"use strict";

var express = require("express");

var helmet = require("helmet");

var cors = require("cors");

var cookieParser = require("cookie-parser");

var authRouter = require("./auth/auth-router");

var usersRouter = require("./users/users-router");

var server = express();
var port = process.env.PORT || 5000;
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(cookieParser());
server.use("/api/", authRouter);
server.use("/api/users", usersRouter);
server.get("/", function (req, res, next) {
  res.json({
    message: "Welcome to our API"
  });
});
server.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong"
  });
});
server.listen(port, function () {
  console.log("Running at http://localhost:".concat(port));
});