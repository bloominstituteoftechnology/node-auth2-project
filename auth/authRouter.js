const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // ---> npm i jsonwebtoken


const Users = require("../users/users-model.js");
const secrets = require('../api/secrets.js');

router.post("/register", (req, res) => {
  let user = req.body; // username, password
  //rounds are 2 to the N times
    const rounds = process.env.HASH_ROUNDS || 14

  // hash the creds.password

  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;


  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.post("/login", (req, res) => {
    let {username, password} = req.body; 


  // search for the user by the username
    Users.findBy({username})
      .then(found => {
          console.log("found", found[0]);
          //if we find the user, then also check that passwords match
          if(found && bcrypt.compareSync(password, found[0].password)) {
              //produce a token
              const token = generateToken(found);
              //send the token to the client
              res.status(200).json({message: "welcome!", token})
          } else {
            res.status(401).json({message: 'You cannot pass!'})
          }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: error.message });
      });
  });

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if(err) {
                res.status(500).json({errorMessage: "Failed to logout"})
            } else {
                res.status(200).json({message: "you have logged out"})
            }
        });
    }
})

function generateToken(user) {
  //the payload is the data
  const payload = {
    userId: user.id,
    username: user.username
  }
  const secret = secrets.jwtSecret
  const options = {
    expiresIn: "1d"
  }
  return jwt.sign(payload, secret, options);
}

module.exports = router; 