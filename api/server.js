const express = require('express');

const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Global Middleware
app.use(helmet());
app.use(express.json());
app.use(cors());

module.exports = app;

