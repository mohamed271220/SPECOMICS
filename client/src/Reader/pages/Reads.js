import React, { useEffect, useState } from "react";
import AddMangaForm from "../components/AddMangaForm";

import SkeletonPost from "../../shared/Loading/Skeleton/SkeletonPost";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/Error/ErrorModal";
import SingleRead from "../components/SingleRead";
import Card from "../../shared/components/UI/Card/Card";

const Reads = () => {
  
  const { sendRequest, isLoading, error, data } = useHttpClient();
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const data = await sendRequest("http://localhost:8080/manga/");
        // mangas: mangas,
        // totalItems: totalItems,
        setMangas(data.mangas);
        console.log(data.mangas);
        console.log(data.totalItems);
      } catch (err) {}
    };
    fetchMangas();
  }, [sendRequest]);

  return (
    <div>
      {isLoading && <SkeletonPost />}
      {/* <ErrorModal error={error} /> */}
      {!isLoading && mangas && mangas.length > 0 && (
        <Card className="small-menu">
          <h1>New Releases</h1>
          <div className="small-menu-container">
          
            {mangas.map((manga) => (
              <div className="Reads-container">
                <SingleRead manga={manga} key={manga._id} />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Reads;
