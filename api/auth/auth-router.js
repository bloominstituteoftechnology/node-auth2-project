const router = require('express').Router();
const users = require('../users/users-model.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../config/secrets.js')


router.post('/register', async (req,res) => {
    let user = req.body;

    const hash = bcryptjs.hashSync(user.password, 10);
    user.password = hash


    try{
    const savedUser = await Users.add(user);
    res.status(201).json(savedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"error creating user"})
    }
})

router.post('/login', async (req,res) => {
    let { username, password} = req.body;
try{
const user = users.findBy({username}).first();

    if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        req.session.user = user;
        res.status(200).json({message: `welcome ${user.username}`, token});
    } else {
        res.status(401).json({message:"invalid credentials"})
    }
} catch (err) {
    console.log(err);
    res.status(500).json({message:"error creating user"})
}

})

router.get("/logout", (req,res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.send("error! Not groovy baby")
            } else {
                res.send("Groovy baby! Goodbye")
            }
        })
    } else {
        res.end();
    }
})

function generateToken(user) {

    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    };

    const options = {
        expiresIn: '1h'
    };

    const secret = secrets.jwtSecret;

  return jwt.sign(payload, secret, options);


}

module.exports = router;