import React from "react";
import { useParams } from "react-router-dom";

const SingleNews = () => {
  const newsId = useParams().newsId;

  // THEN SEARCH THE DATA FOR THE NEWS WITH THAT ID
  // THE DATA YOU GOT FROM THE REQ
  return <div>{newsId}</div>;
};

export default SingleNews;
