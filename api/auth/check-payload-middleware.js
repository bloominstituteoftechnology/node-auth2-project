module.exports = (req, res, next) => {
  const { username, password } = req.body;
  const valid = Boolean(username && password && typeof password === "string");
  if (valid) {
    next();
  } else {
    next({ status: 422, message: "Please provide username and password" });
  }
};
