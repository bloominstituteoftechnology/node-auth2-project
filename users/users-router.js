const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../middleware/restricted-middleware.js');
const authz = require('../middleware/authz.js');

router.get('/', restricted, authz, (req, res) => {
  Users.find()
    .then((users) => {
      const filteredUsers = users.filter((item) => {
        if (req.decodedJwt.roles === 'admin') {
          return item.department !== req.decodedJwt.roles;
        }
        return item.department === req.decodedJwt.roles;
      });
      res.json(filteredUsers);
    })
    .catch((err) => res.send(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Failed to delete user' });
    });
});

module.exports = router;

// router.get('/', restricted, authz,  (req, res) => {
//   Users.find()
//     .then(users => {
//         let filteredUsers = users.filter(item =>{
//             // console.log(item.department, 'item departament')
//             // console.log(req.decodedJwt.roles ,"token role")
//             return item.department === req.decodedJwt.roles;
//         })
//       res.json(filteredUsers);
//     })
//     .catch(err => res.send(err));
// });
