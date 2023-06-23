import React from "react";
import { useGetGenresQuery } from "../../../shared/store/jikanSlice";
import { Link } from "react-router-dom";
import SkeletonPost from "../../../shared/Loading/Skeleton/SkeletonPost";
import ErrorModal from "../../../shared/components/Error/ErrorModal";
const Genres = () => {
  const { data, isLoading, isError } = useGetGenresQuery();
  let Nono =['Boys Love','Girls Love',"Hentai","Ecchi","Erotica" ,"Adult Cast"]
  return (
    <>
      <ErrorModal error={isError} />
     { isLoading ? (
      <SkeletonPost />) : (
      <div className="tags">
        {data.data
            .filter((genre) => !Nono.includes(genre.name)  )
          .map((genre) => (
            <Link
              to={`/discover/genres/${genre.mal_id}/${genre.name}`}
              className="tag__background"
            >
              <p>{genre.name}</p>
            </Link>
          ))
        }
      </div>
      )}
    </>
  );
};

export default Genres;
