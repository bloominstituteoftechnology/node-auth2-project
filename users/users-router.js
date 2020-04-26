const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../middleware/restricted-middleware.js');
//const checkRole = require('../middleware/check-role-middleware.js');
const authz = require('../middleware/authz.js');

router.get('/', restricted, authz,  (req, res) => {
  Users.find()
    .then(users => {
        let filteredUsers = users.filter(item =>{
            // console.log(item.department, 'item departament')
            // console.log(req.decodedJwt.roles ,"token role")
            return item.department== req.decodedJwt.roles;
        })
      res.json(filteredUsers);
    })
    .catch(err => res.send(err));
});

module.exports = router;