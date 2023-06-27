import { useCallback, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Manga/pages/Home/HomePage";
import News from "./News/pages/News";
import Popular from "./Manga/pages/Categories/Popular";
import SingleNews from "./News/pages/SingleNews";
import TopCategory from "./Manga/pages/Categories/TopCategory";
import MainLayout from "./shared/components/MainLayout";
import MangaDetails from "./Manga/pages/MangaDetails";
import { AuthContext } from "./shared/context/auth-context";

import Recomended from "./Manga/pages/Categories/Recomended";
import Genre from "./Manga/pages/Genre/Genre";
import Genres from "./Manga/pages/Genre/Genres";
import Discover from "./Manga/pages/Discover/Discover";
import Reads from "./Reader/pages/Reads";
import AddAndEditManga from "./Reader/pages/AddManga";
import Read from "./Reader/pages/Read";
import AddChapter from "./Reader/pages/AddChapter";
import axios from "axios";
import ChapterReader from "./Reader/pages/ChapterReader";
import EditManga from "./Reader/pages/EditManga";
import Favorite from "./Favorite/pages/Favorite";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    // error element with main navigation
    errorElement: <h1>Page not found</h1>,
    //we might need a footer
    element: <MainLayout />,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "news",
        children: [
          {
            index: true,
            element: <News />,
          },
          {
            // /news/newsId
            path: ":newsId",
            element: <SingleNews />,
          },
        ],
      },
      {
        path: "discover",
        // there is a shared element here don't forget to add it
        // element: <discoverLayout/>
        children: [
          {
            index: true,
            element: <Discover />,
          },
          {
            path: "Top",
            element: <TopCategory />,
          },
          {
            path: "Popular",
            element: <Popular />,
          },
          {
            path: "Recommended",
            element: <Recomended />,
          },
          {
            path: "genres",
            element: <Genres />,
          },
          {
            path: "genres/:genreId/:genreName",
            element: <Genre />,
          },
        ],
      },
      {
        path: "manga/:mangaId",
        element: <MangaDetails />,
      },
      {
        path: "favorites/:userId",
        element: <Favorite />,
      },
      {
        path: "read",
        children: [
          {
            index: true,
            element: <Reads />,
          },
          {
            path: "addManga",
            element: <AddAndEditManga />,
          },
          {
            path: ":readId",
            children: [
              {
                index: true,
                element: <Read />,
              },
              {
                path: "addChapter",
                element: <AddChapter />,
              },
              {
                path: "edit",
                element: <EditManga />,
              },
              {
                path: ":chapterId",
                element: <ChapterReader />,
                children: [
                  {
                    path: "edit",
                    element: <h1>Edit chapter</h1>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

let LogoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((userId, token, expirationDate) => {
    setToken(token);
    setUserId(userId);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      LogoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(LogoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
