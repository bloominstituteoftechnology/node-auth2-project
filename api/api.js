const router = require("express").Router();

const restrictedMiddleware = require("../auth/restricted-middleware.js");

router.get("/", (req, res) => res.send("API Call is ready to listen"));

//====================Auth Router ==========================
const authRouter = require("../auth/auth-router.js");
router.use("/auth", authRouter);
//====================end of auth routes ====================

//================user api ====================
const userRouter = require("./routers/user-router.js");
router.use("/users", restrictedMiddleware, userRouter);
//===========end=============

module.exports = router;
