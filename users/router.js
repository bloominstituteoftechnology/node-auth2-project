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
		const { username, password, department } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,
			// hash the password with a time complexity of "14"
			password: await bcrypt.hash(password, 14),
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
				message: "Invalid Credentials",
			})
		}

		// hash the password again and see if it matches what we have in the database
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// generate a new session for this user,
		// and sends back a session ID
		// req.session.user = user

		const payload = {
			userId: user.id,
			username: user.username,
			department: user.department, // would normally come from database
		}

		//res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET || "some ssecret")) // sets cookie DONT USE IN BUILD WEEK
		res.json({
			token: jwt.sign(payload, process.env.JWT_SECRET || "some ssecret"), // for build week do tokens
			message: `Welcome ${user.username}! from the ${user.department} department`,
		})
	} catch(err) {
		next(err)
	}
})

router.get("/logout", async (req, res, next) => {
    res.clearCookie("token");
    res.send("cookie has been eaten")
})

module.exports = router