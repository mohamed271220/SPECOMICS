import React from "react";
import { useParams } from "react-router-dom";
import { useGetGenreByIdQuery } from "../../../shared/store/jikanSlice";
import SingleManga from "../../../shared/components/SingleManga/SingleManga";
import SkeletonPost from "../../../shared/Loading/Skeleton/SkeletonPost";
import hero from "../../assets/heroBanner.jpg";
import Button from "../../../shared/components/FormElements/Button/Button";


const Genre = () => {
  const genreName = useParams().genreName;
  const genreId = useParams().genreId;

  const [currentPage, setCurrentPage] = React.useState(1);
  // const [data, setData] = React.useState([]);
  // const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // React.useEffect(() => {
  //   const fetchData = async (genreId, currentPage) => {
  //     try {
  //       const response = await sendRequest(
  //         `https://api.jikan.moe/v4/manga?genres=${genreId}?page=${currentPage}`
  //       );
  //       setData(response);
  //       console.log(response);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData(genreId, currentPage);
  // }, [genreId, currentPage, sendRequest]);

  const { data, isLoading, error } = useGetGenreByIdQuery(genreId, currentPage);
  return (
    <>
      {isLoading ? (
        <SkeletonPost />
      ) : (
        <div className="small-menu">
          <div className="Hero__image">
            <img src={hero} alt="hero" />
            <h1>{genreName}</h1>
          </div>
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
      )}
    </>
  );
};

export default Genre;
