const router = require('express').Router();

router.use('/status', (req, res) => {
	res.send({ userRouter: 'up' });
});

module.exports = router;

