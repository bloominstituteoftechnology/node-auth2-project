const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const Users = require('../users/user-model');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generatetoken(saved);
      res.status(201).json({ created_user: saved, token: token });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generatetoken(user)

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          jwt_token: token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


function generatetoken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  // const secret = process.env.JWT_SECRET || 'supercalafragalistic';
  const options = {
    expiresIn: '30min'
  }

  const token = jwt.sign(payload,secrets.jwtSecret,options)
  return token;
}

module.exports = router;