import React from "react";
import { useGetPopularQuery } from "../../../shared/store/jikanSlice";
import SingleManga from "../../../shared/components/SingleManga/SingleManga";
import SkeletonPost from "../../../shared/Loading/Skeleton/SkeletonPost";
const Popular = () => {
  const { data, isLoading, error } = useGetPopularQuery();
  return (
    <div className="small-menu">
      <h1>Popular Now!</h1>
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

export default Popular;
