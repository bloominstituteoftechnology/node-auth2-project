const express = require('express');
const router = express.Router();
const Users = require('./user-model');

router.get('/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.send(err)); 
});

router.post('/users', (req, res) => {
    const { username, password } = req.body;
    const user = Users.findBy({ username }).first();

    if (user) {
        return res.status(409).json({ message: 'invalid username '});
    } else {
        const addUser = Users.add({ username, password });
        res.status(201).json(addUser);
    };
});

module.exports = router;