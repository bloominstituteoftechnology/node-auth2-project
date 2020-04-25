const router = require('express').Router();

router.get('/status', (req, res) => {
	res.send({ authentication: "up"});
});

module.exports = router; 

