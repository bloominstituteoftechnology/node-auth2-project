const router = require("express").Router();
const Users = require("./users-model.js");
const { restricted, only } = require("../auth/auth-middleware.js");


router.get("/", restricted, (req, res, next) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});


router.get("/:user_id", restricted, only("admin"), (req, res, next) => {
  Users.findById(req.params.user_id)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

module.exports = router;

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    }
  ]
 */

  /**
  [GET] /api/users/:user_id

  This endpoint is RESTRICTED: only authenticated users with role 'admin'
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    }
  ]
 */
