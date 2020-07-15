const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./model")
const restrict = require("../middleware/restrict")

const router = express.Router()

router.get("/users", restrict("sales"), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {

	next(err)
	}
})

router.post("/register", async (req, res, next) => {
	try {
		const { username, password, department} = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
			message: "Username already exists",
			})
		}
		const newUser = await Users.add({
			username,
			password: await bcrypt.hash(password, 10),
			department
	})
		res.status(201).json(newUser)
        } catch(err) {
        next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
	const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		if (!user) {
			return res.status(401).json({
				message: "Invalid",
			})
		}

		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
		return res.status(401).json({
				message: "Invalid",
			})
		}

		const payload = {
			userId: user.id,
			username: user.username,
			department: user.department, 
		}

		
		res.json({
			message: `Welcome ${user.username}`,
			token : jwt.sign(payload, process.env.JWT_SECRET || "something")
		})
	} catch(err) {
		next(err)
	}
})

router.get("/logout", async (req, res, next) => {
    res.clearCookie("token");
    res.send("cookie sent")
})

module.exports = router