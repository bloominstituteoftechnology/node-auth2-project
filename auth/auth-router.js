const router = require('express').Router();
const bcrypt = require('bcryptjs');


const Users = require("../users/user-model");


router.post("/register",(req,res)=>{
    let user=req.body;
    const hash=bcrypt.hashSync(user.password,10)
    user.password=hash;

    Users.add(user)
    .then(saved=>{
        res.status(201).json(saved)
    })
    .catch(error=>{
        res.status(500).json(error)
    })
})

router.post("/login", (req,res)=>{
    let{username,password}=req.body;

    Users.findBy ({username})
    .first()
    .then(user=>{
        if(user && bcrypt.compareSync(password,user.password)){
            res.status(200).json({
                message:`Welcome ${user.username}`
            })

        }else{
            res.status(401).json({message:`Invalid credentials`})
        }
    })
    .catch(error=>{
        res.status(500).json(error)
    })
})

module.exports=router