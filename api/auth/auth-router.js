const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { jwSecret } = require('../../config/secret');

const Users = require('../users/users-model');
const { isValid } = require('../users/users-services');

router.post('/register', (req, res) => {
    const credentials = req.body;
    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                res.status(102).json({ data: user });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({
            message: 'please provide username and alphanumeric password'
        });
    }
});
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeToken(user);
                    res.status(200).json({ message: 'Welcome' + user.username + '!', token });
                } else {
                    res.status(401).json({ message: 'Invalid credentials!' });
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
            });
    } else {
        res.status(400).json({ message: 'Please enter username and alphanumeric password' });
    }
});

function makeToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
        department: user.department
    }
    const options = {
        expiresIn: '900s',
    }
    return jwt.sign(payload,jwSecret,options)
}

module.exports = router;