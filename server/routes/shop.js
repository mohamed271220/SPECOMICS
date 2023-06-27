const express = require("express");
const { body } = require("express-validator");
const fs = require("fs");
const isAuth = require("../middleware/is-auth");
const shopControllers = require("../controllers/shop");

//====================================================================

// SETTING MULTER
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", shopControllers.getMangas);

router.post(
  "/newManga",
  fileUpload.single("image"),
  isAuth,
  shopControllers.addManga
);

router.get("/:mangaId", shopControllers.getManga);
//edit a manga
router.put(
  "/:mangaId/edit",
  fileUpload.single("image"),
  isAuth,
  shopControllers.updateManga
);

router.delete("/:mangaId", isAuth, shopControllers.deleteManga);

// TODO: favorites routes
router.get("/:userId/favs", isAuth, shopControllers.getFavoritesByUserId);
// add too favorites
router.post("/:userId/fav/:readId", isAuth, shopControllers.addToFavReads);

router.post("/:userId/fav/mal/:jikanId", isAuth, shopControllers.addToFavManga);

router.delete("/:userId/fav/:someId", isAuth, shopControllers.removeFromFav);

//TODO:chapter routes
// get a single chapter
router.get("/chapters/:chapterId", shopControllers.getChapter);

// add a chapter
router.post(
  "/:mangaId/addChapter",
  fileUpload.array("images", 40),
  isAuth,
  shopControllers.addChapter
);
// edit a chapter
router.put("/:chapterId/edit", isAuth, shopControllers.updateChapter);

// delete a chapter
router.delete("/:chapterId/delete", isAuth, shopControllers.deleteChapter);

module.exports = router;
