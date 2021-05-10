const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const db = require("../users/users-model")
const jwt = require("jsonwebtoken")
const {validateRoleName, checkUsernameExists} = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // use this secret! */

router.post("/register", validateRoleName, async (req, res, next) => {
  try {
    const { username, password, role_name } = req.body
    const user = await db.findBy({username})
      if(user) {
        console.log(user)
        return res.status(409).json({message: "Username is already taken"})
        
      } else {
        next()
      }

    const registerUser = await db.add({
        username,
        role_name,
        password: await bcrypt.hash(password, parseInt(process.env.ROUNDS)),
      })
        res.status(201).json(registerUser)
      } catch(err) {
        next(err)
      }
    })


router.post("/login", checkUsernameExists, async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await db.findBy({username}).first()
      if(!user) {
        return res.status(401).json({message: "Invalid credentials"})
      }
    
    const passwordValid = await bcrypt.compare(password, user.password)
      if (!passwordValid) {
        return res.status(401).json({message: "Invalid credentials"})
      } 

    const token = jwt.sign({
      userID: user.id,
      username: user.username,
      role_name: user.role_name
    }, JWT_SECRET)

    res.json({
      message: `${user.username} is back!`,
      token: token,
    })

  } catch(err) {
    next(err)
  } 
});

module.exports = router;
