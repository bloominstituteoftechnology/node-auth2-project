const router = require('express').Router();

const Users = require('./users-model');

const authorizer = require('../auth/authroize-mw');

router.get('/', authorizer, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(error => {
        res.send("error")
    })
})

module.exports = router; 