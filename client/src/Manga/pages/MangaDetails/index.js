import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleMangaQuery } from "../../../shared/store/jikanSlice";
import SkeletonPost from "../../../shared/Loading/Skeleton/SkeletonPost";
import Button from "../../../shared/components/FormElements/Button/Button";
import { AiFillStar } from "react-icons/ai";
import { useGetRecommendationsQuery } from "../../../shared/store/jikanSlice";
import SingleManga from "../../../shared/components/SingleManga/SingleManga";
import { CiShare1 } from "react-icons/ci";
import "./index.css";

const MangaDetails = () => {
  const {
    data: recommendationsData,
    isLoading: recommendationsLoading,
    error: recommendationsError,
  } = useGetRecommendationsQuery();
  const mangaId = useParams().mangaId;
  const { data, isLoading, error } = useGetSingleMangaQuery(mangaId);
  //   console.log(data.data);
  return (
    <>
      {isLoading ? (
        <SkeletonPost />
      ) : error || data.data === undefined ? (
        <div>Error</div>
      ) : (
        <div className="manga-details">
          <div className="manga-details__upper">
            <img
              alt={data.data.title}
              src={data.data.images.jpg.large_image_url}
            />
            <h2>
              {data.data.title} {data.data.title_japanese}
            </h2>
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
                <Link to={`/genres/${genre.name}`} className="tag__background">
                  {genre.name}
                </Link>
              ))}
            </div>
            <div className="demographics">
              {data.data.demographics.map((demographic) => (
                <div className="demographic__background">
                  <h3>Demographics</h3>
                  <p>{demographic.name}</p>
                </div>
              ))}
            </div>
          </div>
          <Button target="_blank" size="lean" danger to={data.data.url}>
            Explore more about {data.data.title} <CiShare1 />
          </Button>

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
                  .slice(0, 5)
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MangaDetails;