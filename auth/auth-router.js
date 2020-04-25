const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');


router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            const token = genToken(saved);
            res.status(201).json({ created_user: saved, token: token });
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user);
                res.status(200).json({ username: user.username, token: token });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(400).json({ message: 'error logging out:', error: err });
            } else {
                res.json({ message: 'logged out' });
            }
        });
    } else {
        res.end();
    }
});

function genToken(user) {

    const payload = {
        userid: user.id,
        username: user.username,
        department: user.department
    };

    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secrets.jwtSecret, options);

    return token;
}

module.exports = router;