const router = require("express").Router();

const Users = require("./user-router");
const restricted = require("../router/restricted-middleware");

function roleChecker(role){
  return function (req, res, next){
    if (req.decodedJwt.role === role){
      next();
    } else {
      res.json({message: 'no access'})
    }
    
  }
}


router.get("/", restricted, roleChecker(1), (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

//1-react form, login, gets token in res.data.token
//2- axios to make a request to a protected