import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleMangaQuery } from "../../../shared/store/jikanSlice";
import SkeletonPost from "../../../shared/Loading/Skeleton/SkeletonPost";
import Button from "../../../shared/components/FormElements/Button/Button";

const MangaDetails = () => {
  const mangaId = useParams().mangaId;
  const { data, isLoading, error } = useGetSingleMangaQuery(mangaId);
  //   console.log(data.data);
  return (
    <>
      {isLoading ? (
        <SkeletonPost />
      ) : (
        <div className="manga-details">
          <div>
            <img
              alt={data.data.title}
              src={data.data.images.jpg.large_image_url}
            />
            <h2>
              {data.data.title} {data.data.title_japanese}
            </h2>
            <p>
              {data.data.score} "star icon" {data.data.scored_by}
            </p>
            <p>{data.data.synopsis}</p>
          </div>
          <div>
            <h3>tags</h3>
            <div className="tags">
              {data.data.genres.map((genre) => (
                <div className="tag__background">{genre.name}</div>
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
          <Button danger to={data.data.url}>
            SEE MORE
          </Button>
        </div>
      )}
    </>
  );
};

export default MangaDetails;
