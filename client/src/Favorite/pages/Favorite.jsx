import React, { useContext, useMemo } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/Error/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const Favorite = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const { userId } = useParams();

  const [favManga, setFavManga] = React.useState([]);
  const [favReads, setFavReads] = React.useState([]);
  const [favLoadedManga, setLoadedFavManga] = React.useState([]);
  const [favLoadedReads, setLoadedFavReads] = React.useState([]);

  const fetchedFavorites =  () => {
    
    favManga.map(async (manga) => {
      const response = await fetch(`https://api.jikan.moe/v4/manga/${manga}`);
      const data = await response.json();
      setLoadedFavManga((prevState) => [...prevState, data.data]);
    });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:8080/manga/${userId}/favs`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        setFavManga(response.favManga);
        console.log(response.favManga);
        setFavReads(response.favReads);
      } catch (err) {}
    };
    fetchData();
    fetchedFavorites()
  }, [sendRequest, userId, auth.token]);

  

  console.log(favLoadedManga);

  return (
    // TODO: add mal id Favorite

    // TODO: add reads Favorite

    // TODO: add remove options
    <>
      <ErrorModal error={error} onClear={clearError} />
    </>
  );
};

export default Favorite;
