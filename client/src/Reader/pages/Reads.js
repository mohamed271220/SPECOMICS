import React, { useContext, useEffect, useState } from "react";
import AddMangaForm from "../components/AddMangaForm";

import SkeletonPost from "../../shared/Loading/Skeleton/SkeletonPost";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/Error/ErrorModal";
import SingleRead from "../components/SingleRead";
import Card from "../../shared/components/UI/Card/Card";
import { NavLink } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button/Button";
import { AuthContext } from "../../shared/context/auth-context";

const Reads = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [mangas, setMangas] = useState();

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/manga/`
        );
        // mangas: mangas,
        // totalItems: totalItems,
        setMangas(data.mangas);
        console.log(data.mangas);
        console.log(data.totalItems);
      } catch (err) {}
    };
    fetchMangas();
  }, [sendRequest]);

  if (!mangas || mangas.length === 0) {
    return (
      <Card>
        <h1>NOTHING AVAILABLE FOR NOW</h1>
        {auth.isLoggedIn && (
          <Button danger size={"wide"} to="/read/addManga">
            Add
          </Button>
        )}
      </Card>
    );
  }

  return (
    <div>
      {isLoading && <SkeletonPost />}
      {/* {error !== "The user aborted a request." && (
        <ErrorModal error={error} onClear={clearError} />
      )} */}
      {auth.isLoggedIn && (
        <Button danger size={"wide"} to="/read/addManga">
          Add
        </Button>
      )}
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
