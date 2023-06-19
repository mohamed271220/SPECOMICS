import React from "react";

import { Link } from "react-router-dom";

import "../pages/News.css";

const NewsCard = (props) => {
  return (
    <Link to={`/news/${props.news.mal_id}`} className="news-card">
      <img src={props.news.images.jpg.image_url} alt={props.news.title} />
      <div className="news-card__info">
        <h1>{props.news.title}</h1>
        <p>{props.news.excerpt}</p>
      </div>
    </Link>
  );
};

export default NewsCard;
