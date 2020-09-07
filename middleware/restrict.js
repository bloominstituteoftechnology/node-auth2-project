const jwt = require("jsonwebtoken")
const { findBy } = require("../users/users-model")

function restrict(role) {
	// use a scale, since admins should still be able to access basic endpoints
    // const roles = ["student", "finance", "HR"]

    // if (role === "student"){
    //     value = 0
    // }
    // else if(role === "admin"){
    //     value = 1
    // }
    // else if (role === "super_admin"){
    //     value = 2
    // }

	return async (req, res, next) => {
		const authError = {
			message: "You shall not pass!",
		}

		try {
			// token is coming from the client's cookie jar, in the "Cookie" header
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json(authError)
			}

			// decode the token, re-sign the payload, and check if signature is valid
			jwt.verify(token, "Super safe", (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
				}

				// we know the user is authorized at this point,
				// make the token's payload available to other middleware functions
				req.token = decoded

				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict