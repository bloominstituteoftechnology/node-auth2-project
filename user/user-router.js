const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./user-model')

const router = express.Router()

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await User.findByUsername(username)
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

		// generate and sign a new JSON web token with some user details
		const token = jwt.sign({
			userID: user.id,
			userName: user.username,
		}, process.env.SECRET)

		// tell the client to save this token in its cookie jar
		res.cookie("token", token)

		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

router.post('/login', async (req,res,next) => {
    try {

        const {username,password} = req.body
        const user = await User.findUserBy({username})

        if(!user) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }

        const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}
        const token = jwt.sign({
            userId: user.id,
        }, process.env.SECRET)

        res.cookie("token", token)

        res.json({
            message: `Welcome ${user.username}`
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router