const express = require("express");
const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");
const shopControllers = require("../controllers/shop");

//====================================================================

// SETTING MULTER
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
// MULTER TO HANDLE MULTIPART FORM DATA
// CONFIGURE MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});

//FILE FILTER
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));

// SET STATIC FOLDER
app.use("/images", express.static(path.join(__dirname, "images")));

//===================================================================

const router = express.Router();

router.get("/", shopControllers.getMangas);
router.post("/newMange", isAuth, shopControllers.addManga);

router.get("/:mangaId", shopControllers.getManga);
//edit a manga
router.put("/:mangaId/edit", isAuth, shopControllers.updateManga);
// TODO: favorites routes
router.get("/:userId/favorites", isAuth, shopControllers.getFavorites);
// add too favorites
router.post("/:mangaId/fav", isAuth, shopControllers.addToFav);

//TODO:chapter routes
// get a single chapter
router.get("/:chapterId", shopControllers.getChapter);

// add a chapter
router.post(
  "/:mangaId/chapters",
  isAuth,
  multer({ storage: storage, fileFilter: fileFilter }).array("images"),
  shopControllers.addChapter
);
// edit a chapter
router.put("/:chapterId/edit", isAuth, shopControllers.updateChapter);

// delete a chapter
router.delete("/:chapterId/delete", isAuth, shopControllers.deleteChapter);


module.exports = router;
