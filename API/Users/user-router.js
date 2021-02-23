const express = require("express");
const User = require("./user-model");
const restricted = require("../Auth/restricted");
const router = express.Router();

router.get("/", restricted, async (req, res, next) => {
  try {
    const rows = await User.find();
    res.status(200).json(rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
