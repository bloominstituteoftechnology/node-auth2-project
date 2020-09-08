const jwt = require("jsonwebtoken")


function restrict(role){
    const roles = ["basic", "admin", "big_boss"]
    return async (req,res,next)=>{
        const autherr ={
            message: "invalid entry"
        }
        try{
          
            const token = req.headers.authorization

            if(!token){
                return res.status(401).json(autherr)
            }
            jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
                if(err){
                    return res.status(401).json(autherr)
                }
                if (role && roles.indexOf(decoded.userRole)< roles.indexOf(role)){
                    return res.status(403).json({
                        message: "Classified"
                    })
                }


                req.token = decoded

                next()
            })
        }catch(err){
            next(err)
        }
    }
}

module.exports={
    restrict,
}