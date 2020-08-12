const router = require("express").Router();
const Users = require("../api/users/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken') // 1 install jwt

const { validateUser } = require("../api/users/usersMiddleware");

// POST -> REGISTER NEW USER
router.post("/register", (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 8);

	user.password = hash;

	Users.add(user)
		.then(newUser => {
			res.status(201).json({ newUser });
		})
		.catch(error => {
		res.status(500).json({ error: "error adding user", error });
	});
});

// POST -> LOGIN With existing User
router.post("/login", (req, res) => {
	const { username, password } = req.body;

    Users.findBy({ username })
        .first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				// 2. produce token
				// 3. send the token to the client
				const token = getJwtToken(user.username)
				res.status(200).json({ message: `Welcome ${user.username}! have a token...`, token });
			} else {
				res.status(401).json({ message: "Invalid credentials" });
			}
		})
		.catch(error =>
		res.status(500).json({ error: "Problem with the database", error })
	);
});


// 4 function for JWT
let getJwtToken = (username) => {
	const payload = {
		username,
		department: "IT" // comes from database
	}

	const secret = process.env.JWT_SECRET || 'is it secret, or safe?';

	const options = {
		expiresIn: "1d"
	};

	return jwt.sign(payload, secret, options)
}




// GET -> Removes the cookies from the session

router.get("/logout", (req, res) => {
	req.session.destroy(error => {
		error
			? res.json({ error: "Unable to logout", error })
			: res.send("Logged out");
	});
});

module.exports = router;