function restrict() {
	return async (req, res, next) => {
		const authError = {
			message: "Invalid Credentials",
		}
		try {
			if (!req.session || !req.session.user) {
				return res.status(401).json(authError)
			}
			next()
		} catch(err) {
			next(err)
		}}
}

module.exports = restrict