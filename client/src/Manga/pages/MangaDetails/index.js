import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetCharactersQuery,
  useGetSingleMangaQuery,
} from "../../../shared/store/jikanSlice";
import SkeletonPost from "../../../shared/Loading/Skeleton/SkeletonPost";
import Button from "../../../shared/components/FormElements/Button/Button";
import { AiFillStar } from "react-icons/ai";
import { useGetRecommendationsQuery } from "../../../shared/store/jikanSlice";
import SingleManga from "../../../shared/components/SingleManga/SingleManga";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import { CiShare1 } from "react-icons/ci";
import LoadingSpinner from "../../../shared/Loading/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../shared/components/Error/ErrorModal";
import "./index.css";

const MangaDetails = () => {
  const auth = useContext(AuthContext);
  const {
    data: recommendationsData,
    isLoading: recommendationsLoading,
    error: recommendationsError,
  } = useGetRecommendationsQuery();
  const mangaId = useParams().mangaId;
  const { data, isLoading, error } = useGetSingleMangaQuery(mangaId);
  const {
    data: charactersData,
    isLoading: charactersLoading,
    error: charactersError,
  } = useGetCharactersQuery(mangaId);
  //   console.log(data.data);

  const {
    sendRequest,
    isLoading: favLoading,
    error: favError,
    clearError,
  } = useHttpClient();

  // const AddToFavHandler = async () => {
  //   try {
  //     sendRequest(
  //       `http://localhost:8080/manga/${auth.userId}/fav/mal/${mangaId}`,
  //       "POST",
  //       null,
  //       {
  //         Authorization: `Bearer ${auth.token}`,
  //       }
  //     );
  //   } catch (err) {}
  // };

  return (
    <>
      <ErrorModal
        error={favError || recommendationsError || error}
        onClear={clearError}
      />
      {isLoading || recommendationsLoading || favLoading ? (
        <SkeletonPost />
      ) : error || data.data === undefined ? (
        <div>Error</div>
      ) : (
        <div className="manga-details">
          <div className="manga-details__upper">
            <img
              alt={data.data.title}
              src={data.data.images.webp.large_image_url}
            />
            <div>
              {favLoading && <LoadingSpinner asOverlay />}
              <h2>
                {data.data.title} {data.data.title_japanese}
              </h2>
              {/* {auth.token && (
                <Button
                  target="_blank"
                  size="wide"
                  danger
                  onClick={AddToFavHandler}
                >
                  Add to Favorite
                </Button>
              )} */}
            </div>
            <p>
              {data.data.score} <AiFillStar color="#ffdd1e" /> Rated By :{" "}
              {data.data.scored_by}
            </p>
            <p>{data.data.synopsis}</p>
          </div>
          <div>
            <h2>Tags</h2>
            <div className="tags">
              {data.data.genres.map((genre) => (
                <Link
                  to={`/discover/genres/${genre.mal_id}/${genre.name}`}
                  className="tag__background"
                >
                  <p>{genre.name}</p>
                </Link>
              ))}
            </div>
            <Link className="more-tags" to={"/discover/genres"}>
              Explore more genres <CiShare1 />
            </Link>
            <div className="demographics">
              <h3>Demographics</h3>
              {data.data.demographics.map((demographic) => (
                <div className="demographic__background">
                  <p>{demographic.name}</p>
                </div>
              ))}
            </div>
          </div>
          <Button target="_blank" size="lean" danger to={data.data.url}>
            Explore more about {data.data.title} <CiShare1 />
          </Button>

          <div className="characters"></div>

          <h2>EXPLORE TOO</h2>
          <div className="recommendations">
            <div className="category-container">
              {recommendationsLoading && <SkeletonPost />}
              {recommendationsError || recommendationsData === undefined ? (
                <div>Error</div>
              ) : (
                recommendationsData.data
                  .map((manga) => {
                    const entry = manga.entry.map((manga) => manga);
                    return (
                      <SingleManga key={manga.entry.mal_id} manga={entry[0]} />
                    );
                  })
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 4)
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MangaDetails;
