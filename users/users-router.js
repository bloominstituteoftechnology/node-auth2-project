const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware.js');

router.get('/', restricted, checkRole('FINANCE'), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.status(401).json({ message: 'You shall not pass!' }));
});

module.exports = router;