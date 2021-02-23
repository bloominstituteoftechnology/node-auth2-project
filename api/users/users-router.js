const express = require('express')
const router = express.Router()

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');
const checkRole = require('../auth/checkRole-middleware');

router.get('/', restricted, checkRole, (req, res) =>{
    Users.find()
    .then((users) =>{
      res.status(200).json(users)
    })
    .catch((err) =>{
        res.status(500).send(err)
    })
    
})

module.exports = router;
