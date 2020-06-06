module.exports = role => {
  return function (req, res, next) {
    if (req.decodedJwt.role && req.decodedJwt.role === role) {
      next();
    } else {
      res.status(401).json({message: 'kirkby types to fast'});
    }
  }
}