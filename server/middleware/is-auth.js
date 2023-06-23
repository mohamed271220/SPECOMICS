const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    // verify the token and decode it
    // same secret used to create the token
    decodedToken = jwt.verify(token, "TheSecretOfTurningAZeroIntoAnOneIs");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  // if token is undefined
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
