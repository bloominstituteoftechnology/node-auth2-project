const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./user-model")
const userMiddleware = require("./user-Middleware")


const router = express.Router()


router.get("/users",userMiddleware.restrict("admin"), async (req,res,next)=>{
    try{
      res.json(await User.find())
    }catch(err){
        next(err)
    }
})

router.post("/register", async (req,res,next)=>{
    try {
		const { username, password,department } = req.body
		const user = await User.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await User.add({
			username,
            password: await bcrypt.hash(password, 15),
           department
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req,res,next)=>{
    try {
		const { username, password } = req.body
		const user = await User.findBy({ username }).first()
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		const passwordV = await bcrypt.compare(password, user.password)

		if(!passwordV){
			return res.status(401).json({
				message: "Invalid Password",
			})
        } 
        
        const token = jwt.sign({
            userId: user.id,
            userRole: "admin"
        }, process.env.JWT_SECRET)
       

		res.json({
            message: `Welcome ${user.username}!`,
            token: token,
		})
	} catch(err) {
		next(err)
	}
})


module.exports = router