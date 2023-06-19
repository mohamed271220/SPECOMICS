// import React, { useState } from "react";

// import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
// import "./Carousel.css";
// const Carousel = ({ data }) => {
//   const [slide, setSlide] = useState(0);

//   const nextSlide = () => {
//     setSlide(slide === data.length - 1 ? 0 : slide + 1);
//   };

//   const prevSlide = () => {
//     setSlide(slide === 0 ? data.length - 1 : slide - 1);
//   };

//   return (
//     <div className="carousel">
//       <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
//       {data.map((item, idx) => {
//         return (
//           <>

//           <img
//             src={item.images.jpg.image_url}
//             alt={item.title}
//             key={idx}
//             className={slide === idx ? "slide" : "slide slide-hidden"}
//           />

//           </>
//         );
//       })}
//       <BsArrowRightCircleFill
//         onClick={nextSlide}
//         className="arrow arrow-right"
//       />

//       <span className="indicators">
//         {data.map((_, idx) => {
//           return (
//             <button
//               key={idx}
//               className={
//                 slide === idx ? "indicator" : "indicator indicator-inactive"
//               }
//               onClick={() => setSlide(idx)}
//             ></button>
//           );
//         })}
//       </span>
//     </div>
//   );
// };

// export default Carousel;

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import React from "react";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";

const NewsCarousel = (props) => {
  const navigate = useNavigate();
  return (
    <Carousel
      dynamicHeight
      stopOnHover
      showThumbs={false}
      centerMode
      autoPlay
      labels
      centerSlidePercentage={70}
      onClickItem={() => {
        navigate("/news");
      }}
    >
      {props.data.map((item) => {
        return (
          <div className="carousel-item">
            <img
              className="carousel-item__image"
              src={item.images.jpg.image_url}
              alt={item.title}
            />
            <p className="legend">{item.title}</p>
          </div>
        );
      })}
    </Carousel>
  );
};

export default NewsCarousel;
