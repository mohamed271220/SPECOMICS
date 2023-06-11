// ERROR
const { validationResult } = require("express-validator");

const { v4: uuidv4 } = require("uuid");
const Manga = require("../models/manga");
const Chapter = require("../models/chapter");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");

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
    await manga.save();
    const user = await User.findById(req.userId);
    user.mangas.push(manga);
    await user.save();
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

exports.addChapter = async (req, res, next) => {
  const mangaId = req.params.mangaId;
  const errors = validationResult(req);
  if (!req.file) {
    const error = new Error("NO PFP PROVIDED!!");
    error.statusCode = 422;
    throw error;
  }
//====================
  // test elements
  // const pagesURls =req.body.pagesURls;
  //======================================
  const pagesURls = req.file.path.replace("\\", "/");
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
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
    await chapter.save();
    const manga = await Manga.findById(mangaId);
    manga.chapters.push(chapter);
    await manga.save();
    res.status(201).json({
      message: "Chapter created successfully!",
      chapter: chapter,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getManga = async (req, res, next) => {
  const mangaId = req.params.mangaId;

  try {
    const manga = await Manga.findById(mangaId).populate("chapters");
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

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  console.log(filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
