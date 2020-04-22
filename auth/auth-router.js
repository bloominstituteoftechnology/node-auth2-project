const router = require("express").Router();
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/user-model");
const { jwtSecret } = require("../config/secrets");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 20);
    user.password = hash;
  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
});

router.post('/login', (req,res) => {
    let {username, password} = req.body;

    Users.findBy({username})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user)
            res.status(201).json({
                message: `Welcome ${user.username}! Here is your token`
            })
        } else {
            res.status(500).json(err);
        }
    })
    .catch(err => res.status(500).json(err));
})

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role || 'user'
    }
    const options = {
        expiresIn: '2h'
    } 
    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
