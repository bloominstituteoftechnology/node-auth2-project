
const router = require('express').Router()
const Accounts = require('./accounts-model')
const restricted = require('../auth/restricted-middleware')

router.get('/', restricted ,(req,res)=>{
    Accounts.findBy({department: req.jwt.department})
    .then(users => {
        res.status(200).json({data: users})
    })
})



// function checkDeparment(department){
//     return function (req,res,next){
//         if(department.includes(req.jwt.department)){
//             Accounts.findBy({department: 'Development'})
//             .then( acc =>{
//                 res.status(200).json({data: acc})
                
//             })
//             .catch( err =>{
//                 res.status(500).json({ message: ' Server is having trouble'})
//             })
          
//         } else {
//             res.status(500).json({you: "you can't touch this"})
//         }
//         next()
//     }
// }

// By({department: req.jwt.department})







module.exports = router;