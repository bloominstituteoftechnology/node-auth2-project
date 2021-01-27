const express = require('express');


const server = express();

server.get('/', (req, res) => {
    res.json({ message: 'server is running' });
});

module.exports = server;