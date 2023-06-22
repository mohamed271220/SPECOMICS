import React from "react";
import { useParams } from "react-router-dom";
import { useGetGenreByIdQuery } from "../../../shared/store/jikanSlice";
import SingleManga from "../../../shared/components/SingleManga/SingleManga";
import SkeletonPost from "../../../shared/Loading/Skeleton/SkeletonPost";

const Genre = () => {
  const genreName = useParams().genreName;
  const genreId = useParams().genreId;
  const pageNum = 1;

  const { data, isLoading, error } = useGetGenreByIdQuery(genreId, pageNum);
  return (
    <div className="small-menu">
      <h1>{genreName}</h1>
      <div className="category-container">
        {isLoading && <SkeletonPost />} {error && <div>Error</div>}
        {!isLoading &&
          data.data.map((item) => (
            <SingleManga
              className="small-menu__item"
              manga={item}
              key={item.mal_id}
            />
          ))}
      </div>
    </div>
  );
};

export default Genre;
