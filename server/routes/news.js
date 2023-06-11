const express = require("express");
const { body } = require("express-validator");
const newsController = require("../controllers/news");

const router = express.Router();

router.get("/", newsController.getNews);
router.get("/:id",newsController.getNewsById);

// ADMIN ROUTES
// router.put("/:id");
// router.delete("/:id");

module.exports = router;
