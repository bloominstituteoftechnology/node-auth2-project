const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');
const { jwtSecret } = require("../../config/secrets");

router.post('/register', (req, res) =>{
    const credentials = req.body;

    if(isValid(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 10;

        const hash = bcrypt.hashSync(credentials.password, rounds);
        
        credentials.password = hash;

        Users.add(credentials)
        .then((user) =>{
            res.status(201).json(user);
        })
        .catch((error) =>{
            res.status(500).json({message: error.message})
        })
    } else{
        res.status(400).json({message: 'Please provide username, password, and department'})
    }
});

module.exports = router;
