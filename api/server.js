const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');
const token = require('../auth/auth-token-valid');

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/auth", authRouter);
server.use('/api/users', token, checkUser('users'), usersRouter)
server.get('/', (req,res) => {
    res.send('message')
})

function checkUser(role){
    return (req,res,next) => {
        if (
            res.decodedToken &&
            res.decodedToken.role &&
            res.decodedToken.role.toString().toLowerCase() === role
        ) {
            next();
        } else {
            res.status(404).json({message: 'can not pass'})
        }
    }
}

module.exports = server;