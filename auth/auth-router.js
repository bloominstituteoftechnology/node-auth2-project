//set up the router object with express and bcrypt and jsonwebtoken objects
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // -> npm i jsonwebtoken if not done so already

//set up the Users object with the helper functions and the secret object
const Users = require('../users/users-model.js');
const secrets = require('../api/secrets.js');

//function to generate tokens for the client
function generateToken(user) {
    //the data
    const payload = {
        userId: user.id,
        username: user.username,
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secret, options);
}

/** ENDPOINTS */

//Register User
router.post('/register', (req, res) => {
    //set user to username and password via req.body
    let user = req.body;

    //set up the security hash rounds
    const rounds = process.env.HASH_ROUNDS || 8;

    //hash the password
    const hash = bcrypt.hashSync(user.password, rounds);

    //update the user to use the hash
    user.password = hash;

    //add the user
    Users.add(user)
        .then(saved => {
            //if successful
            res.status(201).json(saved);
        })
        .catch(error => {
            //if failed to add to the server
            res.status(500).json({ errorMessage: error.message});
        });
});

//Login
router.post('/login', (req, res) => {
    //set up the username and password objects to be checked against the login info
    let { username, password } = req.body;

    //search for the user using the username
    Users.findBy({username})
        .then(([user]) => {
            // if the username is found, check to see if the passwords match
            if (user && bcrypt.compareSync(password, user.password)) {
                //generate a token for the user
                const token = generateToken(user);

                //send the token to the client
                res.status(200).json({message: 'Successfully logged in!', token});
            } else {
                //if the password does not match
                res.status(401).json({message: 'Incorrect password.'});
            }
        })
        //if the client cannot be found
        .catch(err => {
            res.status(500).json({errorMessage: err.message});
        });
});

//export
module.exports = router;