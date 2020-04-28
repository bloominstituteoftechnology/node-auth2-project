const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const restricted = require("./auth/restricted-middleware");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const knexSessionStore = require("connect-session-knex")(session);

const AuthRouter = require("./auth/auth-router");
const UsersRouter = require("./routes/userRouter.js");

const server = express();

const sessionConfig = {
  name: "chocolate-chip",
  secret: "myspeshulsecret",
  cookie: {
    maxAge: 3600 * 1000,
    secure: false, // should be true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("./data/db-config.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 3600 * 1000,
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/auth", AuthRouter);
server.use("/api/user", restricted, UsersRouter);

server.get("/", (req, res) => {
  res.send("Welcome");
});

server.get("/token", (req, res) => {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const secret = "mySecret";

  const option = {
    expiresIn: "30m",
  };

  const token = jwt.sign(payload, secret, option);
  res.json(token);
});

module.exports = server;
