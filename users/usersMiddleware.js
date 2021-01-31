//authentication/logging
const bcrypt = require("bcryptjs")
const Users = require("./usersModel")
const jwt = require("jsonwebtoken")

function restrict(role = "basic") {
	// This middleware function should restrict routes to authorized users only.
	// It should get the username and password from the request headers.
	return async (req, res, next) => {
		const authError = {
			message: "Invalid credentials",
		}

		try {
			const token = req.headers.authorization
			if (!token) {
				return res.status(401).json(authError)
			}
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json({
						message: "invalid credentials"
					})
				}

				//attach decoded payload to the request so we can use the later
				req.token = decoded
				//token has been verified
				next()
			})

		} catch (err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}