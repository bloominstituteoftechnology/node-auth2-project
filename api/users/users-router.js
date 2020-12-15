const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/ristricted-middleware');
const checkRole = require('../auth/check-role-middleware');

router.get('/', restricted, checkRole('head'), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;