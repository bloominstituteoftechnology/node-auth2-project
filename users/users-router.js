const express = require("express")
const router = express.Router()
const db = require("../data/db-config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const restrict = require("./users-middleware")
router.get("/users", restrict(), (req,res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({message: "nope bruh"})
        })
})

router.post("/register", async (req,res) => {
    if (req.body){
        const {username, password, department} = req.body
        const newUser = {
            username,
            password: await bcrypt.hash(password, 6),
            department
        }
        await db.add(newUser)
        res.status(201).json({message: "user added"})
    } else {
        res.status(400).json({message: "Please provide valid username, password and department!"})
    }
})

router.post("/login", async (req,res,next) => {

    try {
		const { username, password } = req.body
		const user = await db.findBy({ username }).first()
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// hash the password again and see if it matches what we have in the database
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		const token = jwt.sign({
			userID: user.id,
		}, process.env.JWT_SECRET)

		res.json({
			message: `Welcome ${user.username}!`,
			token,
		})
	} catch(err) {
		next(err)
	}

})

router.get("/logout", async (req,res,next) => {
    try {
        req.session.destroy((err) => {
            if(err){
                next(err)
            } else{
                res.status(204).json({message: "user logged out"}).end()
            }
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router