const express = require('express');

const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/router.js');
const authRouter = require('./auth/router.js');

const app = express();

// Global Middleware
app.use(helmet());
app.use(express.json());
app.use(cors());

// Routers
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.get('/api/status', (req, res) => {
	res.send({ api: 'up'});
});

module.exports = app;

