const { JWT_SECRET } = require("../secrets"); // use this secret!
const yup = require('yup')

const messageSchema = yup.object({
  username: yup.string(),
  password: yup.string().required("/ must be longer than 3/i").min(3, "/ must be longer than 3/i"),
  role_name: yup.string().trim().max(32,'can not be longer than 32 chars')
})

const restricted = (req, res, next) => {
  /*
    If the user does not provide a token in the Authorization header:
    status 401
    {
      "message": "Token required"
    }

    If the provided token does not verify:
    status 401
    {
      "message": "Token invalid"
    }

    Put the decoded token in the req object, to make life easier for middlewares downstream!
  */
 next()
}

const only = role_name => (req, res, next) => {
next()
}


const checkUsernameExists = (req, res, next) => {
  /*
    If the username in req.body does NOT exist in the database
    status 401
    {
      "message": "Invalid credentials"
    }
  */
    next()
}


const validateRoleName = async (req, res, next) => {
  try {
    const validate = await messageSchema.validate(req.body, { stripUnknown: true })
    if(validate.role_name === 'admin'){
      next({status: 422, message: 'can not be admin'})
    } else {
      req.body = validate
      next()
    }
  } catch (err) {
    next({ status: 422, message: err.message })
  }
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}
