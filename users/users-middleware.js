const { JsonWebTokenError } = require("jsonwebtoken")
const jwt = require("jsonwebtoken")

function restrict(role) {
	return async (req, res, next) => {
		try {
			
			
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json({
					message: "invalid credentials",
				})
			}
			
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json({
						message: "invalid credentials"
					})
				}

				
				
				req.token = decoded
				
				
				next()
			})

		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}