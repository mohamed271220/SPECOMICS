const User = require("../models/user");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");

// Authentication
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const status = req.body.status;

  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new Error("Signing up failed");
    error.statusCode = 500;
    return next(error);
  }
  if (user) {
    const error = new Error("User already exists");
    error.statusCode = 404;
    return next(error);
  }

  let hashedPw;

  hashedPw = await bcrypt.hash(password, 12);

  const createdUser = new User({
    email: email,
    password: hashedPw,
    name: name,
    status: status,
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new Error("Signing up failed" + err);
    error.statusCode = 500;
    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: createdUser._id.toString(), email: createdUser.email },
      process.env.JWT_KEY,
      {
        expiresIn: "4h",
      }
    );
  } catch (err) {
    const error = new Error("Signing up failed");
    error.statusCode = 500;
    return next(error);
  }

  res.status(201).json({
    message: "User created",
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
  });
};

// LOGIN
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_KEY,
        { expiresIn: "4h" }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
