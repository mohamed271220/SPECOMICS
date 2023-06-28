const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
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
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
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
  try {
    const user = await User.findById(decodedToken.userId);
    if (user.status === "READER") {
      const error = new Error("user not authorized to make this request");
      error.statusCode = 422;
      return next(error);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }

  req.userId = decodedToken.userId;
  next();
};
