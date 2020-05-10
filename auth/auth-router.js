const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")
const restrict = require("../middleware/restrict")
const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username already in use",
			})
		}
		res.status(201).json(await Users.add(req.body))
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	const authError = {
		message: "Invalid Credentials",
	}
	try {
		const user = await Users.findBy({ username: req.body.username }).first()
		if (!user) {
			return res.status(401).json(authError)
		}
		const passwordValid = await bcrypt.compare(req.body.password, user.password)
		if (!passwordValid) {
			return res.status(401).json(authError)
		}
		req.session.user = user
		res.json({
			message: `Hello ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

router.get("/logout", restrict(), (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			next(err)
		} else {
			res.json({
				message: "Logout Successful",
			})
		}
	})
})

module.exports = router