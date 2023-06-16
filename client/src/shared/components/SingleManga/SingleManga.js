import React from "react";
import Card from "../UI/Card/Card";

import "./SingleManga.css";

const SingleManga = (props) => {
  if (props.isHome) {
    return (
      <div className={props.className}>
        <img src={props.manga.image} alt={props.manga.title} />
        <div className="manga-info">
          <h3>{props.manga.title}</h3>
          <p>{props.manga.author}</p>
        </div>
      </div>
    );
  }
  
    return (
      <div className="hover-card">
        <img src={props.manga.image} alt={props.manga.title} />
        <div className="hover-card-info">
          <h3>{props.manga.title}</h3>
          <p>{props.manga.author}</p>
        </div>
      </div>
    );
  
};

export default SingleManga;
