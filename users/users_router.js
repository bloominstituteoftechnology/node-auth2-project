const express = require('express')
const router = require('express').Router();
const Users = require('./users_model');
const knex = require('knex')
const restricted = require('../auth/restricted_middleware');

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