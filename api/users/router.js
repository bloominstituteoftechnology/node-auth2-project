const router = require('express').Router();

const Users = require('./model.js'); 

router.use('/status', (req, res) => {
	res.send({ userRouter: 'up' });
});

router.get('/', async (req, res) => {
    const users = await Users.get();
    try {
      users
      ? res.send(users)
      : res.status(404).json({ message: 'no users in database'});
    } catch (err) {
	res.status(500).json({ message: 'error', error: err.message });
    }
});

module.exports = router;

