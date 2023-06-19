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
        <SkeletonPost />
      ) : (
        <NewsCarousel data={newsData.data.slice(0, 3)} />
      )}
      {topLoading ? (
        <SkeletonPost />
      ) : (
        <SmallMenu CategoryTitle="Top" mangaData={topData.data} />
      )}
      {popularLoading ? (
        <SkeletonPost />
      ) : (
        <SmallMenu CategoryTitle="Popular" mangaData={popularData.data} />
      )}
      {recommendationsLoading ? (
        <SkeletonPost />
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
