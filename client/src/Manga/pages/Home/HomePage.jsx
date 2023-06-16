import React from "react";
import Carousel from "../../../shared/components/UI/Carousel/Carousel";
import SmallMenu from "../../components/SmallMenu";

const HomePage = () => {
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

  const DUMMY_MANGA_DATA = [
    {
      id: 1,
      image:
        "https://dw9to29mmj727.cloudfront.net/products/1974719995.jpg",
      author: "oda",
      title: "one piece",
    },
    {
      id: 2,
      image:
        "https://dw9to29mmj727.cloudfront.net/products/1974719995.jpg",
      author: "oda",
      title: "one piece",
    },
    {
      id: 3,
      image:
        "https://dw9to29mmj727.cloudfront.net/products/1974719995.jpg",
      author: "oda",
      title: "one piece",
    },
    {
      id: 4,
      image:
        "https://dw9to29mmj727.cloudfront.net/products/1974719995.jpg",
      author: "oda",
      title: "one piece",
    },
    // {
    // image:,author:,title:,
    //     },{
    //       image:,author:,title:,
    //     }
  ];

  return (
    <div className="Hero">
      <Carousel data={DUMMY_DATA.slides} />
      <SmallMenu isHome CategoryTitle="Top" mangaData={DUMMY_MANGA_DATA} />
      <SmallMenu isCate CategoryTitle="Recommended" mangaData={DUMMY_MANGA_DATA} />
      <SmallMenu isHome CategoryTitle="Popular" mangaData={DUMMY_MANGA_DATA} />
    </div>
  );
};

export default HomePage;
