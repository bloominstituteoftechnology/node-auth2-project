//set up router object with express
const router = require('express').Router();

//set up Users object requiring the helper functions
const Users = require('./users-model.js');

//set up endpoint to the base url
router.get('/', (req, res) => {
    //log the token
    console.log('token', req.decodedToken);

    //pull up the list of the Users
    Users.find()
    .then(users => {
        res.json({users});
    })
    .catch(err => res.send(err));
});

//export
module.exports = router;