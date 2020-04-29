const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secret");
const Users = require("../users/users-model");

router.post("/register", (req, res)=>{
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password= hash;

    Users.add(user)
        .then(saved =>{
            const token = genToken(saved)
            res.status(201).json({ created_user: saved, token: token});
        })
        .catch(error =>{
            res.status(500).json(error);
        });
});
router.post("/login", (res,req)=>{
    let {username, password}  = req.body;
    Users.findBy({username})
    .first()
    .then(user =>{
        if (user && bcrypt.compareSync(password, user.password)){
            const token = genToken(user);
            res.status(200).json({username: user.username, token: token});
        } else {
            res.status(401).json({message: "Invalid Credentials"});
        }
    
    })
        .catch(error =>{
            res.status(500).json(error);
        })
});

function genToken(user){
    const payload = {
        userid: user.id,
        username: user.username,
        roles:["STUDENT"]

    };
    const options = { expiresIn: "1hr"};
    const token = jwt.sign(payload, secrets.jwtSecret, options);
    return token;
}

module.exports = router;