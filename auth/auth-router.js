const bcrypt = require('bcryptjs'); // features password hashing function
const jwt = require('jsonwebtoken');

const router = require('express').Router();
const Users = require('../users/users-model.js');

router.post("/register", (req, res) => {
    // hashing password
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json({ saved });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Invalid'
            });
        })
});

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    Users.findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                //req.session.user = username;

                const tokenPayload = {
                    userId: user.id,
                }
                res.cookie('token', jwt.sign(tokenPayload, process.env.JWT_SECRET))
                res.status(200).json({
                    message: 'Logged in',
                });
            } else {
                res.status(401).json({
                    message: 'You shall not pass!'
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Invalid'
            });
        })
})

module.exports = router;