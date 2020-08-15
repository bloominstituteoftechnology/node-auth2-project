function makeCheckRoleMiddleware(department) {
    return function (req, res, next) {
        if(req.decodedJwt.department && req.decodedJwt.department === department) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden wrong Access role" });
        }
    }
}

module.exports = makeCheckRoleMiddleware;




//----------------------------------------------------------------------------//
// This is a middleware "factory" - a "higher order function" that returns a
// customized function, based on its parameters.
//
// When a user successfully logs in or registers, a token is created and saved
// on the request object. If the request comes in AFTER login/registration, it
// should include the token, which, upon initial verification, should be saved
// to the req object as req.decodedJwt.
//
// This middleware method checks the decodedJwt for a "role" property.
//
// This technique uses a "higher order function" to manufacture and return a
// middleware function. We aren't exporting a middleware function. We are
// exporting a middleware function "factory" (creator). By passing in a value to
// the creator, you get back a middleware function that checks for the value in
// the role property on the token. In this way, you can call this exported
// method multiple times with different "role" values, and each time, you will
// get a middleware function that checks for the passed-in role value in the
// req.decodedJwt.role property.
//----------------------------------------------------------------------------//
