const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")

const router = express.Router()

router.get("/users", async (req, res, next) => {
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
        const user = await Users.findBy( {username} ).first()
		
		if (user) {
            const passwordValid = await bcrypt.compare(password, user.password)
            if (passwordValid){
                const role = await Users.findRole({ username }).first()
                const token = jwt.sign({
                userID: user.id,
                department: role, 
                }, "verified")
                res.cookie("token", token)
                res.json({
                    message: `Welcome ${user.username}!`,
                    token: token
                })
            }
            else{
                return res.status(401).json({
                    message: "You shall not pass!",
                })
            }
        }
        else{
            return res.status(401).json({
				message: "You shall not pass!",
			})
        }
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