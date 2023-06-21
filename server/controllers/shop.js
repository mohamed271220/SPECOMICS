// ERROR
const { validationResult } = require("express-validator");

const { v4: uuidv4 } = require("uuid");
const Manga = require("../models/manga");
const Chapter = require("../models/chapter");
const User = require("../models/user");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

//===============================MANGA CONTROLLERS==========================================

// GET ALL MANGAS

exports.getMangas = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 6;

    const totalItems = await Manga.find().countDocuments();

    const mangas = await Manga.find()
      .populate("author")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: "Fetched mangas successfully!",
      mangas: mangas,
      totalItems: totalItems,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ADD A MANGA

exports.addManga = async (req, res, next) => {
  const errors = validationResult(req);
  if (!req.file) {
    const error = new Error("NO PFP PROVIDED!!");
    error.statusCode = 422;
    throw error;
  }
  ///============================
  // test elements
  // const pfp = req.body.pfp;
  //=============================
  const pfp = req.file.path.replace("\\", "/");
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;

  const description = req.body.description;
  const tags = req.body.tags;

  const manga = new Manga({
    title: title,
    pfp: pfp,
    description: description,
    tags: tags,
    author: req.userId,
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await manga.save({ session: sess });
    const user = await User.findById(req.userId);
    user.mangas.push(manga);
    await user.save({ session: sess });
    sess.commitTransaction();
    res.status(201).json({
      message: "Manga created successfully!",
      manga: manga,
      author: { _id: user._id, name: user.name },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// GET A MANGA
exports.getManga = async (req, res, next) => {
  const mangaId = req.params.mangaId;
  const currentPage = req.query.page || 1;
  const perPage = 6;
  try {
    // const chapters = await Chapter.find({ mangaId: mangaId })
    //   .sort({ chapterNumber: 1 })
    //   .skip((currentPage - 1) * perPage)
    //   .limit(perPage);
    const manga = await Manga.findById(mangaId)
      .populate("chapters")
      .sort({ chapterNumber: 1 });
    if (!manga) {
      const error = new Error("Could not find post");
      error.statusCode = 404;
      throw error;
      // throwing an error in then is like saying go to the next catch block
    }

    res.status(200).json({
      message: "Fetched manga successfully!",
      manga: manga,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

//TODO: update a manga
exports.updateManga = async (req, res, next) => {
  const errors = validationResult(req);
  if (!req.file) {
    const error = new Error("NO PFP PROVIDED!!");
    error.statusCode = 422;
    throw error;
  }
  ///============================
  // test elements
  // const pfp = req.body.pfp;
  //=============================
  const pfp = req.file.path.replace("\\", "/");
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const description = req.body.description;
  const tags = req.body.tags;
  const mangaId = req.params.mangaId;

  let manga;
  try {
    manga = await Manga.findById(mangaId);
    manga.title = title;
    manga.description = description;
    manga.tags = tags;
    await manga.save();
  } catch (err) {
    const error = new Error("Something went wrong");
    error.statusCode = 500;
    return next(error);
  }

  res.status(200).json({ manga: manga.toObject({ getters: true }) });
};

//TODO : delete a manga
exports.deleteManga = async (req, res, next) => {
  const mangaId = req.params.mangaId;
  let manga;
  try {
    manga = await Manga.findById(mangaId).populate("author");
    if (!manga) {
      const error = new Error("Could not find a manga");
      error.statusCode = 404;
      throw error;
    }

    const sess = await mongoose.startSession();
    sess.startTransaction();
    manga.deleteOne({ session: sess });
    manga.author.mangas.pull(manga);
    await manga.author.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new Error("Something went wrong");
    error.statusCode = 500;
    return next(error);
  }
  res.status(200).json({ message: "Deleted manga" });
};

//=============================== FAVORITE PAGE CONTROLLERS  ==========================================

//TODO: get favorite reads (( gets the ids of favReads array and favManga  ))
exports.getFavoritesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let user;
  let favReads;
  let favManga;
  try {
    user = await User.findById(userId);
    favReads = user.favReads;
    favManga = user.favManga;
  } catch (err) {
    const error = new Error("Something went wrong");
    error.statusCode = 500;
    return next(error);
  }
  if (!user) {
    const error = new Error("Could not find user");
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    message: "Fetched user successfully!",
    favReads: favReads.toObject({ getters: true }),
    favManga: favManga.toObject({ getters: true }),
  });
};

// TODO: ADD A MANGA TO USER'S FAV Reads ARRAY (( saves manga id from SPECOMICS API ))
exports.addToFavReads = async (req, res, next) => {
  const userId = req.params.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  if (!user) {
    const error = new Error("Could not find user");
    error.statusCode = 404;
    return next(error);
  }
  const mangaId = req.body.mangaId;
  user.favReads.push(mangaId);
  try {
    await user.save();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  res.status(200).json({ message: "Added to fav reads" });
};

// TODO: ADD A MANGA TO USER'S FAV Manga ARRAY (( saves mal_id from jikan API))
exports.addToFavManga = async (req, res, next) => {
  const userId = req.params.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  if (!user) {
    const error = new Error("Could not find user");
    error.statusCode = 404;
    return next(error);
  }
  const mangaId = req.body.mangaId;
  user.favManga.push(mangaId);
  try {
    await user.save();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  res.status(200).json({ message: "Added to fav manga" });
};

// TODO: REMOVE A MANGA FROM USER'S FAV ARRAY
exports.removeFromFav = async (req, res, next) => {
  const userId = req.params.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    next(error);
  }
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  if (!user) {
    const error = new Error("Could not find user");
    error.statusCode = 404;
    return next(error);
  }
  const mangaId = req.body.mangaId;
  if (req.body.isRead) {
    user.favReads.pull(mangaId);
  } else {
    user.favManga.pull(mangaId);
  }
  try {
    await user.save();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  res.status(200).json({ message: "Removed from fav" });
};

//===============================CHAPTERS CONTROLLERS ==========================================

exports.addChapter = async (req, res, next) => {
  const mangaId = req.params.mangaId;
  const errors = validationResult(req);
  if (!req.files) {
    const error = new Error("NO PANELS PROVIDED!!");
    error.statusCode = 422;
    throw error;
  }
  //====================
  // test elements
  // const pagesURls =req.body.pagesURls;
  //======================================
  const pagesURls = req.files.map((file) => {
    file.path.replace("\\", "/");
  });
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  let manga;

  try {
    manga = await Manga.findById(mangaId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  if (!manga) {
    const error = new Error("Could not find a manga.");
    error.statusCode = 404;
    return next(error);
  }

  const title = req.body.title;
  const chapterNumber = req.body.chapterNumber;
  const chapter = new Chapter({
    title: title,
    chapterNumber: chapterNumber,
    pagesURls: pagesURls,
    mangaId: mangaId,
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await chapter.save({ session: sess });
    manga.chapters.push(chapter);
    await manga.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  res.status(201).json({
    message: "Chapter created successfully!",
    chapter: chapter,
  });
};

// TODO: get a chapter
exports.getChapter = async (req, res, next) => {
  const chapterId = req.params.chapterId;
  let chapter;
  try {
    chapter = await Chapter.findById(chapterId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  if (!chapter) {
    const error = new Error("Could not find a chapter.");
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ chapter: chapter });
};

//TODO: delete a chapter
exports.deleteChapter = async (req, res, next) => {
  const chapterId = req.params.chapterId;
  let chapter;
  try {
    chapter = await Chapter.findById(chapterId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  if (!chapter) {
    const error = new Error("Could not find a chapter.");
    error.statusCode = 404;
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    chapter.deleteOne({ session: sess });
    chapter.manga.chapters.pull(chapter);
    await chapter.manga.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  res.status(200).json({ message: "Deleted chapter" });
};

//TODO: update a chapter
exports.updateChapter = async (req, res, next) => {
  const chapterId = req.params.chapterId;
  const errors = validationResult(req);

  if (!req.files) {
    const error = new Error("NO PANELS PROVIDED!!");
    error.statusCode = 422;
    throw error;
  }
  //====================
  // test elements
  // const pagesURls =req.body.pagesURls;
  //======================================
  const pagesURls = req.files.map((file) => {
    file.path.replace("\\", "/");
  });

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const chapterNumber = req.body.chapterNumber;
  let chapter;
  try {
    chapter = await Chapter.findById(chapterId);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  if (!chapter) {
    const error = new Error("Could not find a chapter.");
    error.statusCode = 404;
    return next(error);
  }
  chapter.title = title;
  chapter.chapterNumber = chapterNumber;
  chapter.pagesURls = pagesURls;
  await chapter.save();
  res.status(200).json({ chapter: chapter.toObject({ getters: true }) });
};
//==================================================================================================

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  console.log(filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

//==================
/*

const imageDownloader = require('image-downloader')
const multer = require('multer')

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg'
    //lib image downloader
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json('/uploads/' + newName)
});


const phostoMiddleware = multer({ dest: 'uploads/' })

app.post('/upload', phostoMiddleware.array('photos', 25), (req, res) => {
    console.log(req.files);
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''))
    }
    res.json(uploadedFiles)
});

*/
