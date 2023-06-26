import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/Error/ErrorModal";
import { Carousel } from "react-responsive-carousel";
import LoadingSpinner from "../../shared/Loading/LoadingSpinner/LoadingSpinner";

const ChapterReader = () => {
  const [chapter, setChapter] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const { chapterId } = useParams();

  useEffect(() => {
    axios
      .get(`manga/chapters/${chapterId}`)
      .then((response) => {
        setLoading(true);
        console.log(response.data.chapter);
        setTitle(
          response.data.chapter.chapterNumber +
            ":" +
            response.data.chapter.title
        );
        setChapter(response.data.chapter.pagesURls);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chapterId]);

  return (
    <div>
      {isLoading && <LoadingSpinner asOverlay />}
      <h1>{title}</h1>
      <Carousel
        dynamicHeight
        showIndicators={false}
        stopOnHover
        showThumbs={false}
        labels
        swipeable
        centerSlidePercentage={70}
      >
        {chapter.map((page) => {
          return (
            <img src={`http://localhost:8080/uploads/${page}`} alt="page" />
          );
        })}
      </Carousel>
    </div>
  );
};

export default ChapterReader;
