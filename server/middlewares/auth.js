const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7);
  } else {
    token = req.body.token || req.query.token || req.headers["x-access-token"];
  }

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyToken;