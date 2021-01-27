const router = require('express').Router()
const Users = require('./user-model')

router.get('/', (req, res) => {
    Users.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
})

router.post('/', (req, res) => {
    console.log(req.body)
    Users.add(req.body)
    .then(newUser => {
        console.log(newUser)
        res.status(210).json(newUser)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err.message)
    })  
})


module.exports = router;