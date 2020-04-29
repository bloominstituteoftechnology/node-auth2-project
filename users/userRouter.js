const express = require('express')
const router = express.Router();

const db = require('./user-model');
const restricted = require('../auth/middleware');

router.get('/', restricted, ( req, res ) => {
  db.find()
    .then( user => {
      res.status(200).json(user);
    })
    .catch( err => {
      res.status(500).json({message: 'Error retreiving users', err})
    })
});

module.exports = router;