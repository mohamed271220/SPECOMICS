const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const router = express.Router();

//POST auth/signup

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
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
