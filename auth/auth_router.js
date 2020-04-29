const router = require('express').Router();

//import bcrypt

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//this allwos us to look up users and add them to the DB
const Users = require('../users/users_model')


//extract the user object from the 'req.body'
//hash the password with bcrypt and store on the user object
//has format = [vers][cost][salt][hash]
router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error)
    })

    router.post('/login', (req, res) => {
        let {username, password} = req.body;
        Users.findBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                jwt_token = token;

                req.session.user = username;
                res.status(200).json({message: `Welcome ${user.name}!`})
            } else {
                res.status(401).json({message: 'invalid credentials'});
            }
        })
        .catch(error => {
            res.status(500).json(err0r);
        })
    })
    function generateToekn(user) {
        const payload = {
            subject: user.id,
            username: user.username,
        };
        const secret = 'secret';
        const options = {
            expiresIn: '30m'
        };
        return jwt.sign(payload, secret, options);
    }
})