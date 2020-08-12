const router = require("express").Router();
const Users = require("../../api/users/usersModel");

// Gets all users within the same department

// router.get("/", (req, res) => {
// 	console.log(req.decodedToken);
// 	const { department } = req.decodedToken;
// 	Users.findByDept(department)
// 		.then(users => {
// 			users
// 				? res.status(200).json(users)
// 				: res.status(400).json({ error: "Failed to retrieved users" });
// 		})
// 		.catch(error => res.status(500).json({ error: error.message }));
// });



// Gets all users

router.get("/", (req, res) => {
	Users.find()
		.then(users => {
			users
				? res.status(200).json(users)
				: res.status(400).json({ error: "Failed to retrieved users" });
		})
		.catch(error => res.status(500).json({ error: error.message }));
});





module.exports = router;