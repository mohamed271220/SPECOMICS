import React from "react";
import NewsCarousel from "../../../shared/components/UI/Carousel/Carousel";
import SmallMenu from "../../components/SmallMenu";
import {
  useGetNewsQuery,
  useGetTopQuery,
  useGetPopularQuery,
  useGetRecommendationsQuery,
} from "../../../shared/store/jikanSlice";
import SkeletonPost from "../../../shared/Loading/Skeleton/SkeletonPost";
import LoadingSpinner from "../../../shared/Loading/LoadingSpinner/LoadingSpinner";
const HomePage = () => {
  const {
    data: topData,
    isLoading: topLoading,
    error: topError,
  } = useGetTopQuery();
  const {
    data: newsData,
    isLoading: newsLoading,
    error: newsError,
  } = useGetNewsQuery("13");
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
      {newsLoading ? (
        <LoadingSpinner />
      ) : newsError || newsData.data === undefined ? (
        <div>error</div>
      ) : (
        <NewsCarousel
          key={newsData.data.mal_id}
          data={newsData.data.slice(0, 3)}
        />
      )}

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
    </div>
  );
};

export default HomePage;
