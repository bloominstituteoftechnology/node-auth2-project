const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const middlewares = [express.json(), helmet(), cors()];

module.exports = (server) => {
  server.use(middlewares);
};
