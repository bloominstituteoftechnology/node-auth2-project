const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const {JWT_SECRET} = require("../secrets");
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model.js")
const jwt = require("jsonwebtoken")

router.post("/register", validateRoleName, (req, res, next) => {
    let user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash
    user.role_name = req.role_name
    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(next);
});

router.post("/login", checkUsernameExists, (req, res, next) => {
    let {username, password} = req.body;
    Users.findBy({username})
    .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = makeToken(user)
            res.status(200).json({
                message: `${user.username} is back!`,
                token: token
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    })
    .catch(next);
});

function makeToken(user){
    const payload = {
        subject: user.user_id,
        username: user.username,
        role_name: user.role_name
    }
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload,JWT_SECRET,options)
}

module.exports = router;
