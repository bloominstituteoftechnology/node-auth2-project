const express = require("express")
const Users = require("./users-model")
const restrict = require("../middleware/restrict")

const router = express.Router()

// This endpoint is only available to logged-in admin users due to the `restrict` middleware
router.get("/", restrict("admin"), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

module.exports = router