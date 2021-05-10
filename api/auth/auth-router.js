const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { add, findBy } = require("../users/users-model")

//add validateRoleName
router.post("/register", validateRoleName(), checkUsernameExists(), async (req, res, next) => {
  try {
    const { username, password, role_name } = req.body
   
    const newUser = await add({
      username: username,
      password: await bcrypt.hash(
        password, 
        parseInt(process.env.BCRYPT_TIME_COMPLEXITY)
      ),
      role_name: role_name
    })

    res.status(201).json(newUser)
  } catch(err) {
      next(err)
  }
});


router.post("/login", checkUsernameExists(), async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await findBy({ username })

    const passwordValid = await bcrypt.compare(password, user.password)
    if(!passwordValid){
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }
    
    const token = jwt.sign({
      subject: user.user_id,
      username: user.username,
      role_name: user.role_name
    }, JWT_SECRET)

    res.cookie("token", token)
    res.status(200).json({
      message: `${user.username} is back!`,
    })
  } catch(err) {
      next(err)
  }
});

module.exports = router;
