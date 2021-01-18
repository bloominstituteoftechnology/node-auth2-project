const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const { restrict } = require("./users-middleware")
const router = express.Router();

router.get("/users", restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next)=>{
    try {
        const { username, password } = req.body
		const user = await Users.findByUsername(username)
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
        }
        const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
        }
        const token = jwt.sign({
			userID: user.id,
			userDepartment: user.department,

        }, process.env.JWT_SECRET)

        res.cookie("token", token)

		res.json({
			message: `Welcome ${user.username}!`,
			// token: token,
		})
        
    } catch(err) {
        next(err)
    }
});

router.post("/register", async (req, res, next)=>{
    try {
        const { username, password, department } = req.body
        const user = await Users.findByUsername(username)

        if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
        }
        
        const newUser = await Users.add({
            username,
            department,
            password: await bcrypt.hash(password, 14)
        })

        res.status(201).json(newUser)
    } catch(err) {
        next(err)
    }
});



module.exports = router;