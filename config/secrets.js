if (!process.env.JWT_SECRET){
    console.log("no secret found")
}
module.exports = {
    jwtSecret: process.env.JWT_SECRET 
}