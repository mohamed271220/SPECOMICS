const User = require("../models/user");

const id = 13;
exports.getNews = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 5;
  fetch(`https://api.jikan.moe/v4/manga/${id}/news`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      console.log(data.data);
      const news = [];
      for (let i = 0; i < perPage; i++) {
        news[i] = data.data[(currentPage - 1) * perPage + i];
      }

      return res.status(200).json({ news: news });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getNewsById = (req, res, next) => {
  const newsId = req.params.id;
  fetch(`https://api.jikan.moe/v4/manga/${id}/news`)
    .then((response) => response.json())
    .then((data) => {
      return data.data.find((news) => news.mal_id == newsId);
    })
    .then((news) => {
      return res.status(200).json({ news: news });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
