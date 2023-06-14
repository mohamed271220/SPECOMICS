import React from "react";
import Carousel from "../../../shared/components/UI/Carousel/Carousel";

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

  return <div className="Hero">
 
 <Carousel data={DUMMY_DATA.slides} />
  HomePage
  </div>;
};

export default HomePage;
