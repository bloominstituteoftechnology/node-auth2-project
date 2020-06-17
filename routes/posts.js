const router = require('express').Router()
const verify = require('./privateRoute')
const User = require('../model/User')

router.get('/', verify, (req, res)=>{
   User.find({})
   .then(users =>{
       res.json({

        confirmation: 'success',
        data: users
       })
   })
    
})

module.exports= router