const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { jwtSecret } = require('../../config/secrets');

router.post('/register', (req, res) => {

});

router.post('/login', (req, res) => {

});

module.exports = router;
