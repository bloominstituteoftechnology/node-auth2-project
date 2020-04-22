const router = require("express").Router();

const Users = require("./users-model");

router.use("/", (req, res) => {
	const department = req.decodedToken.department;

	Users.getUsersBy({ department })
		.then((users) => res.status(200).json(users))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
		});
});

module.exports = router;