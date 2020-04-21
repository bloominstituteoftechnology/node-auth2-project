//set up authenticator to see if client is session is still marking logged in
module.exports = (req, res, next) => {
    //if session is still active
    if(req.session.loggedIn){
        next();        
    } else {
        //if session is not active
        res.status(401).json({message: 'Your session has expired, please login'});
    }
};