const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      return res.status(404).send({
        success: false,
        msg: "No auth header found",
      });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(404).send({
        success: false,
        msg: "No token found",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          success: false,
          msg: "Unathorized user",
        });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Please provide auth token",
    });
  }
};

module.exports = authMiddleware;
