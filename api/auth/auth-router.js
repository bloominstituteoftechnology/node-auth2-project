const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { jwtSecret } = require('../../config/secrets');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
// Creates a user using the information sent inside the body of the request. 
// Hash the password before saving the user to the database.
});

router.post('/login', (req, res) => {
// Use the credentials sent inside the body to authenticate the user. 
// On successful login, create a new JWT with the user id as the subject and send it back to the client. 
// If login fails, respond with the correct status code and the message: 'You shall not pass!'
});

module.exports = router;
