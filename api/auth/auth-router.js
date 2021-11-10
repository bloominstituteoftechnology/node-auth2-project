const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./../users/users-model");
const jwt = require("jsonwebtoken");
const { checkUsernameExists, validateRoleName } = require("./auth-middleware");
const { JWT_SECRET } = require("../secrets"); // use this secret!

router.post("/register", validateRoleName, async (req, res, next) => {
  let user = req.body;

  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(user.password, rounds);

  user.password = hash;

  try {
    const newUser = await Users.add(user);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }

  /**
    [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }

    response:
    status 201
    {
      "user"_id: 3,
      "username": "anna",
      "role_name": "angel"
    }
   */
});

router.post("/login", checkUsernameExists, (req, res, next) => {
  const { username, password } = req.body;
  const { userFromDb } = req;

  if (bcrypt.compareSync(password, userFromDb.password)) {
    const payload = {
      subject: userFromDb.user_id,
      username: userFromDb.username,
      role_name: userFromDb.role_name,
    };
    const options = {
      expiresIn: "1d",
    };
    const token = jwt.sign(payload, JWT_SECRET, options);
    res.status(200).json({ message: `${username} is back!`, token });
  } else {
    next({ status: 401, message: "Invalid credentials" });
  }
  /**
    [POST] /api/auth/login { "username": "sue", "password": "1234" }

    response:
    status 200
    {
      "message": "sue is back!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ETC.ETC"
    }

    The token must expire in one day, and must provide the following information
    in its payload:

    {
      "subject"  : 1       // the user_id of the authenticated user
      "username" : "bob"   // the username of the authenticated user
      "role_name": "admin" // the role of the authenticated user
    }
   */
});

module.exports = router;
