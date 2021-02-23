const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { jwtSecret } = require("../../config/secrets");
const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');


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
            res.status(500).json({message: error.message});
        })
    } else{
        res.status(400).json({message: 'Please provide username, password and department'});
    }
});

router.post('/login', (req, res) =>{
    const { username, password } = req.body;

    if(isValid(req.body)){
        Users.findBy({username: username})
        .then(([user]) =>{
            if(user && bcrypt.compareSync(password, user.password)){
                const token = makeToken(user)

                res.status(200).json({message: `Welcome to our API ${user}`, token});
            } else{
                res.status(401).json({message: 'Invalid credentials'});
            }
        })
        .catch((error) =>{
            res.status(500).json({message: error.message});
        })
    } else{
        res.status(400).json({message: 'Please provide username, password and department'});
    }
});

function makeToken(user){
    const payload ={
        subject: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '2h'
    }
    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
