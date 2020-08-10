function makeCheckDepartmentMiddleware(department_id) {
  return function (req, res, next) {
    if (
      req.decodedJwt.department &&
      req.decodedJwt.department === department_id
    ) {
      next();
    } else {
      res.status(403).json({ you: "do not have the power" });
    }
  };
}

module.exports = makeCheckDepartmentMiddleware;
