import React from "react";

import { Link } from "react-router-dom";

const SingleRead = (props) => {
  return (
    <Link to={`/read/${props.manga._id}`} className="hover-card">
      <img
        src={`${process.env.REACT_APP_BACKEND_URL}/${props.manga.image}`}
        alt={props.manga.title}
      />
      <div className="hover-card-info">
        <h3>{props.manga.title}</h3>
        <p>{props.manga.author}</p>
      </div>
    </Link>
  );
};

export default SingleRead;
