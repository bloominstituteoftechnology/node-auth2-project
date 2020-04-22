const router = require('express').Router();

const Users = require('./user-model');
const restricted = require('../auth/auth-token-valid');

router.get('/', restricted, (req,res ) => {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => res.send(err))
})

module.exports = router;