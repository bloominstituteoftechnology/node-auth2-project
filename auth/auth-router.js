const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model");

router.use("/register", (req, res) => {
	const user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	Users.addUser(user)
		.then(([user]) => res.status(201).json(user))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

router.use("/login", (req, res) => {
	const { username, password } = req.body;

	Users.getUserBy({ username })
		.then(([user]) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);

				res.status(200).json({ token });
			} else {
				res.status(401).json({ message: "Invalid username or password" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

function generateToken(user) {
	const payload = {
		department: user.department,
	};

	const options = {
		expiresIn: "1d",
	};

	return jwt.sign(payload, process.env.JWT_SECRET || "keep it a secret", options);
}

module.exports = router;