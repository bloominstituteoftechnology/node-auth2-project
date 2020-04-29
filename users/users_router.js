const router = require('express').Router();
const Users = require('./users_model');

router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(error => {
        res.send(error);
    })
}) 

module.exports = router;