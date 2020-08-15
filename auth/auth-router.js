const bcryptjs = require('bcryptjs');
const router = require('express').Router();
const jwt = require("jsonwebtoken"); //todo(1)
const secrets = require("../config/secrets.js"); //todo 6

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if(isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        //hash the pass
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        //save User to DB
        Users.add(credentials)
          .then(user => {
              res.status(201).json({ data: user });
          })
          .catch(error => {
              res.status(500).json({ message: error.message });
          });
    } else {
        res.status(400).json({
            message: "please provide user and pass and pass should be alphanum"
        });
    }
});


//----------------------------------------------------------------------------//
// When someone successfully authenticates, reward them with a token, so they
// don't have to authenticate again.
//----------------------------------------------------------------------------//

router.post("/login", (req,res) => {
    const { username, password } = req.body;

    if(isValid(req.body)) {
        Users.findBy({ username: username })
          .then(([user]) => {
              if(user && bcryptjs.compareSync(password, user.password)) {
                  //todo 2
                  const token = generateToken(user);
                  res.status(200).json({ message: "Welcome ot our API", token });
              } else {
                  res.status(401).json({ message: "Invalid credentials" });
              }
          })
          .catch(error => {
              res.status(500).json({ message: error.message });
          });
    } else {
        res.status(400).json({
            message: 'please provide user and pass and pass should be alphanum'
         });
    }
});

//todo 3
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: "1h"
    };

    const secret = secrets.jwtSecret;
    return jwt.sign(payload, secret, options);
}

module.exports = router;
