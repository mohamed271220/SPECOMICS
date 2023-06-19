import React from "react";
import NewsCarousel from "../../../shared/components/UI/Carousel/Carousel";
import SmallMenu from "../../components/SmallMenu";
import {
  useGetNewsQuery,
  useGetTopQuery,
} from "../../../shared/store/jikanSlice";
const HomePage = () => {
  const { data, isLoading, error } = useGetTopQuery();
  const {
    data: newsData,
    isLoading: newsLoading,
    error: newsError,
  } = useGetNewsQuery("13");

  const DUMMY_DATA = {
    slides: [
      {
        src: "https://picsum.photos/seed/img1/600/400",
        alt: "Image 1 for carousel",
      },
      {
        src: "https://picsum.photos/seed/img2/600/400",
        alt: "Image 2 for carousel",
      },
      {
        src: "https://picsum.photos/seed/img3/600/400",
        alt: "Image 3 for carousel",
      },
    ],
  };
  // images
  // jpg
  // image_url

  console.log(newsData);
  return (
    <div className="Hero">
      {!newsLoading && <NewsCarousel data={newsData.data.slice(0, 3)} />}
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <SmallMenu CategoryTitle="Top" mangaData={data.data} />
      )}
      {/* <SmallMenu isCate CategoryTitle="Recommended" mangaData={DUMMY_MANGA_DATA} /> */}
      {/* <SmallMenu isHome CategoryTitle="Popular" mangaData={DUMMY_MANGA_DATA} /> */}
    </div>
  );
};

export default HomePage;
