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
import hero from "../../assets/heroBanner.jpg";
import "./Discover.css";
import Button from "../../../shared/components/FormElements/Button/Button";
const Discover = () => {
  const genreId = Math.floor(Math.random() * 10);

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
      <div className="Hero__image">
        <img src={hero} alt="hero" />
        <div className="page_title">
       
        </div>
      </div>
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
      <Button danger size={'wide'} to={`genres`} >Explore more genres</Button>
    </div>
  );
};

export default Discover;
