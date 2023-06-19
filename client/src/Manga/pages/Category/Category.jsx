import React from "react";
import { useGetTopQuery } from "../../../shared/store/jikanSlice";
import SingleManga from "../../../shared/components/SingleManga/SingleManga";

import './Category.css'
const Category = () => {
  const { data, isLoading, error } = useGetTopQuery();
  return (
    <div className="small-menu">
    <h1>Top Manga</h1>
    <div className="category-container">
      {isLoading && <div>Loading...</div>} {error && <div>Error</div>}
    {!isLoading && data.data.map((item) => (
        <SingleManga className='small-menu__item' manga={item} key={item.mal_id} />
    ))}
    </div>
    </div>
  );
};

export default Category;
