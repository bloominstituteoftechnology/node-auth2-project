const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	jwt.verify(
		token,
		process.env.JWT_SECRET || "shhhh",
		(err, decodedToken) => {
			if (err) {
				console.log(err);
				res.status(401).json({ errmessage: "Not Authorized" });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		}
	);
};