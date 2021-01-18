const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./userModel");
const { restrict } = require("./userMiddleware");
const jwt = require("jsonwebtoken");

const router = express.Router()

router.get("/api/users", restrict(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.post("/api/register", async (req, res, next) => {
	try {
		const { username, password, department } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,
            password: await bcrypt.hash(password, 14),
            department
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/api/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		
		const passwordValid = await bcrypt.compare(password, user.password)
		if (!user || !passwordValid) {
			return res.status(401).json({
				message: "You shall not pass!",
			})
		}

		// req.session.user = user
        const token = jwt.sign({
            id: user.id,
            department: user.department
        }, process.env.JWT_SECRET)
        
		res.json({
            message: `Welcome ${user.username}!`,
            token: token
		})
	} catch(err) {
		next(err)
	}
})

router.get("/logout", async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router