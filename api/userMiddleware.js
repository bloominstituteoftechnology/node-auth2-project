
const jwt = require("jsonwebtoken")

function restrict() {
	return async (req, res, next) => {
		const authError = {
			message: "You shall not pass!",
		}

		try {
			// if (!req.session || !req.session.user) {
			// 	return res.status(401).json(authError)
			// }
            const token = req.header.authorization
            if(!token) {
                return res.status(401).json(authError)
            }
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
                if(err) {
                    return res.status(401).json(authError)
                }

                req.tokenn= decoded

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