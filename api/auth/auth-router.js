const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('../users/user-model');
const { isValid } = require('../users/user-service')

const { jwtSecret } = require('./secrets');

router.post('/register', (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const hash = bcryptjs.hashSync(credentials.password, 8);
        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({ message: 'Invalid credentials'});
    };
});

router.post('/login', (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        Users.findBy({ username: credentials.username })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(credentials.password, user.password)) {
                    const token = generateToken(user);
                    res.status(200).json({ message: `Welcome ${credentials.username}`, token });
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    };
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role,
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;