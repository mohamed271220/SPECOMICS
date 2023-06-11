const express = require("express");
const { body } = require("express-validator");

const shopControllers = require("../controllers/shop");

const router = express.Router();

router.get("/", shopControllers.getMangas);
router.post("/", shopControllers.addManga);

router.get("/:mangaId", shopControllers.getManga);
router.post("/:mangaId", shopControllers.addChapter);

module.exports = router;
