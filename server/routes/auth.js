const express = require("express");
const { body } = require("express-validator");
const User = require("../models/user");
const authController = require("../controllers/auth");
const router = express.Router();

//POST auth/signup

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

// POST AUTH/LOGIN
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.login
);

module.exports = router;
