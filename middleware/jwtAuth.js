const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    jwt.verify(token.replace("Bearer ", ""), jwtConfig.secretKey, {}, (err, decode) => {
      if (err) {
        return res.status(401).json({error: err.message});
      }
      req.user = decode;
      return next();
      });
  } catch (err) {
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
};
