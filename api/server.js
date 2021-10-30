const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const {JWT_SECRET} = require('./secrets/index')
const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");

const server = express();

const configsession = {
  name: 'sessionId',
  secret: JWT_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUnitialized: false,
  store: new KnexSessionStore({
    knex: require('../data/db-config'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createTable: true,
    clearInterval: 1000 * 60 * 60
  })
}


server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(configsession))

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
