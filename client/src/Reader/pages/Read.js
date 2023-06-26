import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import SkeletonPost from "../../shared/Loading/Skeleton/SkeletonPost";
import Button from "../../shared/components/FormElements/Button/Button";
import { AiFillStar } from "react-icons/ai";

import SingleRead from "../components/SingleRead";
import Card from "../../shared/components/UI/Card/Card";

import { CiShare1 } from "react-icons/ci";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/Error/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

import "./Read.css";

const Read = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const readId = useParams().readId;
  const [manga, setManga] = useState({});
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

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

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const data = await sendRequest(`http://localhost:8080/manga/${readId}`);
        // mangas: mangas,
        // totalItems: totalItems,
        setManga(data.manga);
        console.log(data);
        console.log(data);
      } catch (err) {}
    };
    fetchMangas();
  }, [sendRequest, readId]);

  const deleteMangaHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:8080/manga/${readId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/read");
    } catch (err) {}
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      {isLoading ? (
        <SkeletonPost />
      ) : (
        <div className="manga-details">
          <div className="manga-details__upper">
            <img
              alt={manga.title}
              src={`http://localhost:8080/${manga.image}`}
            />
            <h2>{manga.title}</h2>

            <p>{manga.description}</p>
          </div>
          <div className="chapters-container">
            <h2>Chapters</h2>
            {manga.chapters && manga.chapters.length > 0 ? (
              <div>
                {manga.chapters
                  .sort((chapter) => chapter.chapterNumber)
                  .map((chapter) => (
                    <div
                      className="chapters-container__item"
                      key={chapter.chapterNumber}
                    >
                      <Link to={`${chapter.id}`}>
                        chapter : {chapter.chapterNumber}
                      </Link>
                    </div>
                  ))}
                <Button to={`/read/${readId}/addChapter`}>Add Chapter</Button>
              </div>
            ) : (
              <Card>
                <h2> No chapters yet</h2>
                {auth.token && (
                  <Button to={`/read/${readId}/addChapter`}>Add Chapter</Button>
                )}
              </Card>
            )}
          </div>
          {/* <Button target="_blank" size="lean" danger to={manga.url}>
            Explore more about {manga.title} <CiShare1 />
          </Button> */}

          <div className="characters"></div>

          <h2>EXPLORE TOO</h2>
          <div className="recommendations">
            <div className="category-container">
              <div>
                {isLoading && <SkeletonPost />}
                {/* <ErrorModal error={error} /> */}
                {!isLoading && mangas && mangas.length > 0 && (
                  <div className="small-menu-container">
                    {mangas
                      .map((manga) => (
                        <div className="Reads-container">
                          <SingleRead manga={manga} key={manga._id} />
                        </div>
                      ))
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 3)}
                  </div>
                )}
              </div>
            </div>
          </div>
          {auth.token && (
            <div>
              <Button danger size="wide" to={`/read/${readId}/edit`}>
                Edit manga
                <AiFillStar />
              </Button>
              <Button danger size="wide" onClick={deleteMangaHandler}>
                DELETE
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Read;
