import React from "react";
import {
  useGetPopularQuery,
  useGetRecommendationsQuery,
} from "../../../shared/store/jikanSlice";
import SingleManga from "../../../shared/components/SingleManga/SingleManga";
import SkeletonPost from "../../../shared/Loading/Skeleton/SkeletonPost";
const Recomended = () => {
  const { data, isLoading, error } = useGetRecommendationsQuery();
  return (
    <div className="small-menu">
      <h1>Recommended </h1>
      <div className="category-container">
        {isLoading && <SkeletonPost />}
        {error || data === undefined  ? (
          <div>Error</div>
        ) : (
          data.data.map((manga) => {
            const entry = manga.entry.map((manga) => manga);
            return <SingleManga key={manga.entry.mal_id} manga={entry[0]} />;
          })
        )}
      </div>
    </div>
  );
};

export default Recomended;
