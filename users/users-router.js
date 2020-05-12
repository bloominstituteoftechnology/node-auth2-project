const router = require('express').Router();
const restricted = require('../auth/restricted-middleware.js');

const Users = require('./users-model.js');

router.get("/", restricted(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})
module.exports = router;