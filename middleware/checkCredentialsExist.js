const status = require("http-status-codes");

function checkCredentialsExist(req, res, next) {
    if (typeof req.body === "object") {
        if (typeof req.body.username === "string"
            && typeof req.body.password === "string"
            && typeof req.body.department === "string") {
            req.credentials = {
                username: req.body.username,
                password: req.body.password,
                department: req.body.department,
            };
            next()
        } else {
            res.status(status.BAD_REQUEST).json({error: "Request body needs strings 'username', 'password', and 'department'"})
        }
    } else {
        res.status(status.BAD_REQUEST).json({error: "Request must contain a body for credentials"});
    }
}

module.exports = checkCredentialsExist;