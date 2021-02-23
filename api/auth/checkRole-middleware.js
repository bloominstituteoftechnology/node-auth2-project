module.exports = (username) => (req,res,next) =>{
    if(req.decodedToken.username === username){
        next()
    }else{
        res.status(403).json('YOU SHALL NOT PASS!')
    }
}