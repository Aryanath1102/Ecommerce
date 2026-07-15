const adminMiddleware = (req, res, next) => {
  if (req.user.role != "ADMIN") {
    return res.status(403).send({
      success: true,
      msg: "Access Denied",
    });
  }
  next();
};
module.exports = adminMiddleware;
