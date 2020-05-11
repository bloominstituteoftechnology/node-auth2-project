const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");
const restrict = require("../middleware/restrict");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }
    res.status(201).json(await Users.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const authError = {
    message: "Invalid Credentials",
  };

  try {
    const user = await Users.findBy({ username: req.body.username }).first();
    if (!user) {
      return res.status(401).json(authError);
    }

    const passwordValid = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    // const token = generateToken(user);

    if (!passwordValid) {
      return res.status(401).json(authError);
    }

    const tokenPayload = {
      userId: user.id,
      userDept: user.department,
    };

    res.json({
      message: `Welcome ${user.username}!`,
      token: jwt.sign(tokenPayload, process.env.JWT_SECRET),
    });
  } catch (err) {
    next(err);
  }
});

// function generateToken(user) {
//   const payload = {
//     subject: user.id,
//     username: user.username,
//   };
//   const secret = "Keep i secret, keep it safe";
//   const options = {
//     expiresIn: "8h",
//   };
//   return jwt.sign(payload, secret, options);
// }

module.exports = router;
