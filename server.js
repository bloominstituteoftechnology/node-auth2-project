const express = require('express');
const helmet = ('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const restricted = require('./auth/restricted_middleware')
const Users = require('./users/users_router')
const AuthRouter = require('./auth/auth_router')
const server = express();

// server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/auth', AuthRouter)
server.use('/users', restricted, Users)
server.get('/', (req, res) => {
    res.send('Copy, copy')
})

server.get('/token', (req,res) => {

    const payload = {
        subject: 'user',
        userId: 'wcoplen',
        favoriteCar: 'VW'
    }
    const secret = 'secret';

    const options = {
        expiresIn: '30m'
    }
    const token = jwt.sign(payload, secret, options);

    res.json(token);
})
module.exports = server;