const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("./model");
const { validateUserData, restricted } = require("./middleware.js");
const { jwtSecret } = require("../../config/secret.js");

router.post("/register", validateUserData, async (req, res) => {
  
    const credentials = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 10;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    try {
        const newUser = await User.insert(credentials);
        res.status(200).json(newUser);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username: username })
        .then(([user]) => {
            if (user && bcryptjs.compareSync(password, user.password)) {
                const token = makeToken(user);

                res.status(200).json({
                    message: "Welcome to our API " + user.username,
                    token,
                });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
});


router.get("/users", restricted, async (req, res) => {
    try {
        const users = await User.get();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ error: "Not able to get users" });
    }
});
const makeToken = () => {
    const payload = {
        subject: user.id,
        username: user.username,
        deparment: user.deparment,
    };
    const options = {
        expiresIn: "500s",
    };
    return jwt.sign(payload, jwtSecret, options);
};

module.exports = router