const router = require('express').Router();

const bcrypt = require('bcryptjs');

const { genToken } = require('../../utils/index.js');

const Users = require('../users/model.js');

router.get('/status', (req, res) => {
  res.send({ authentication: 'up' });
});

router.post('/register', async (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  try {
    const registered = await Users.add(user);
    if (registered) {
      const token = genToken(registered);
      res.status(201).json({ registered: registered.username, token });
    } else {
      res.status(401).json({ message: 'missing information' });
    }
  } catch (err) {
    res.status(500).json({ message: 'error', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const loggingIn = await Users.getBy({ username }).first();
    if (loggingIn && bcrypt.compareSync(password, loggingIn.password)) {
      const token = genToken({ username, password });
      res.status(200).json({ message: `Welcome ${loggingIn.username}`, token });
    } else {
      res.status(401).json({ message: 'invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'server error', error: err.message });
  }
});

module.exports = router;
