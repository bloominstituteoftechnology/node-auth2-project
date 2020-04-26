const router = require('express').Router();

const bcrypt = require('bcryptjs');

const Users = require('../users/model.js');

router.get('/status', (req, res) => {
  res.send({ authentication: 'up'});
});

router.post('/register', async (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  try {
    const saved = await Users.add(user);
    if (saved) {
      res.status(201).json({ registeredUser: saved });
    } else {
      res.status(401).json({ message: 'missing information' });
    }
  } catch (err) {
    res.status(500).json({ message: 'error', error: err.message });
  }
});

module.exports = router;
