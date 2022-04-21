const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = sign(
    { username: user.username, roles: user.roles },
    "process.env.accessToken"
  );
  return accessToken;
};
const validateToken = (req, res, next) => {
  const accessToken = req.cookies["accessToken"];

  if (!accessToken) {
    return res.status(403).json({
      status: "Error",
      message: "User not logged in.",
    });
  }

  try {
    const validToken = verify(accessToken, "process.env.accessToken");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      message: "Error verifying token.",
    });
  }
};

module.exports = { createToken, validateToken };
