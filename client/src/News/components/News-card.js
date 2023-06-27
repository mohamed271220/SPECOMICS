import React from "react";

import { Link } from "react-router-dom";

import "../pages/News.css";

const NewsCard = (props) => {
  console.log(props.news);
  return (
    <Link target="_blank"  to={props.news.forum_url} className="news-card">
      <img src={props.news.images.jpg.image_url} alt={props.news.title} />
      <div className="news-card__info">
        <h1>{props.news.title}</h1>
        <p>{props.news.excerpt}</p>
      </div>
    </Link>
  );
};

export default NewsCard;
