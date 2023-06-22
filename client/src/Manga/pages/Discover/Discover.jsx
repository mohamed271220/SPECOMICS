import React from "react";
import NewsCarousel from "../../../shared/components/UI/Carousel/Carousel";
import SmallMenu from "../../components/SmallMenu";
import {
  useGetGenreByIdQuery,
  useGetTopQuery,
  useGetPopularQuery,
  useGetRecommendationsQuery,
} from "../../../shared/store/jikanSlice";
import SkeletonPost from "../../../shared/Loading/Skeleton/SkeletonPost";

const Discover = () => {
  const genreId = Math.floor(Math.random() * 10) ;

  const {
    data: topData,
    isLoading: topLoading,
    error: topError,
  } = useGetTopQuery();

  const {
    data: genreData,
    isLoading: genreLoading,
    error: genreError,
  } = useGetGenreByIdQuery(genreId, 1);

  //   console.log(
  //     genreData.data.genres.filter((genre) => genre.mal_id === genreId).name
  //   );

  const {
    data: popularData,
    isLoading: popularLoading,
    error: popularError,
  } = useGetPopularQuery();
  const {
    data: recommendationsData,
    isLoading: recommendationsLoading,
    error: recommendationsError,
  } = useGetRecommendationsQuery();

  return (
    <div className="Hero">
      {/* //================================================= */}
      {topLoading ? (
        <SkeletonPost />
      ) : topError || topData.data === undefined ? (
        <div>Error</div>
      ) : (
        <SmallMenu CategoryTitle="Top" mangaData={topData.data} />
      )}
      {/* //================================================= */}
      {popularLoading ? (
        <SkeletonPost />
      ) : popularError || popularData.data === undefined ? (
        <div>Error</div>
      ) : (
        <SmallMenu CategoryTitle="Popular" mangaData={popularData.data} />
      )}

      {/* //================================================= */}
      {recommendationsLoading ? (
        <SkeletonPost />
      ) : recommendationsError || recommendationsData.data === undefined ? (
        <div>Error</div>
      ) : (
        <SmallMenu
          CategoryTitle="Recommended"
          mangaData={recommendationsData.data}
        />
      )}

      {/* //================================================= */}
      {genreLoading ? (
        <SkeletonPost />
      ) : genreError || genreData.data === undefined ? (
        <div>Error</div>
      ) : (
        <SmallMenu
          CategoryTitle="Random genre"
          genreId={genreId}
          mangaData={genreData.data}
        />
      )}
    </div>
  );
};

export default Discover;
