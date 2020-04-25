const express = require('express');

const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/router');

const app = express();

// Global Middleware
app.use(helmet());
app.use(express.json());
app.use(cors());

// Routers
app.use('/api/users', usersRouter);

module.exports = app;

