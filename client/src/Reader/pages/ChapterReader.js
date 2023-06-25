import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const ChapterReader = () => {
  const { chapterId } = useParams();


  axios.get(`manga/chapters/${chapterId}`).then(response=>console.log(response))


  return <div></div>;
};

export default ChapterReader;
