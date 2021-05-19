const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret!
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const buildToken = require('./token-builder');


router.post("/register", validateRoleName, (req, res, next) => {
  
  let user = req.body;

  // bcrypting the password before saving
  // const rounds = process.env.BCRYPT_ROUNDS || 8// 2 ^ 8
  const hash = bcrypt.hashSync(user.password, 1);

  // never save the plain text password in the db
  user.password = hash

  Users.add(user)
    .then(saved => {
      res.status(201).json({
        message: `${saved.user_id} ${saved.username} ${saved.role_name}`,
      });
    })
    .catch(next);
  /**
    [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }

    response:
    status 201
    {
      "user"_id: 3,
      "username": "anna",
      "role_name": "angel"
    }
   */
});


router.post("/login", (req, res, next) => {
  const { username, password } = req.body
  Users.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = buildToken(user)
        res.status(200).json({
          message: `${user.username} is back`,
          token
        })
      } else {
        next({
          status: 401,
          message: 'invalid credentials'
        })
      }
    })
    .catch(next)
});


module.exports = router;
