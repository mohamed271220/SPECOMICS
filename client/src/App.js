import React, { useCallback, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Manga/pages/Home/HomePage";
import News from "./News/pages/News";
import Popular from "./Manga/pages/Categories/Popular";
import SingleNews from "./News/pages/SingleNews";
import TopCategory from "./Manga/pages/Categories/TopCategory";
import MangaDetails from "./Manga/pages/MangaDetails";
import Recomended from "./Manga/pages/Categories/Recomended";
import Genre from "./Manga/pages/Genre/Genre";
import Genres from "./Manga/pages/Genre/Genres";
import Discover from "./Manga/pages/Discover/Discover";
import Reads from "./Reader/pages/Reads";
import AddAndEditManga from "./Reader/pages/AddManga";
import Read from "./Reader/pages/Read";
import AddChapter from "./Reader/pages/AddChapter";
import ChapterReader from "./Reader/pages/ChapterReader";
import EditManga from "./Reader/pages/EditManga";
import MainLayout from "./shared/components/MainLayout";
import axios from "axios";
import { AuthContext } from "./shared/context/auth-context";

//lazy loading

// const HomePage = React.lazy(() => import("./Manga/pages/Home/HomePage"));
// const News = React.lazy(() => import("./News/pages/News"));
// const Popular = React.lazy(() => import("./Manga/pages/Categories/Popular"));
// const SingleNews = React.lazy(() => import("./News/pages/SingleNews"));
// const TopCategory = React.lazy(() =>
//   import("./Manga/pages/Categories/TopCategory")
// );

// const MangaDetails = React.lazy(() => import("./Manga/pages/MangaDetails"));
// const Recomended = React.lazy(() =>
//   import("./Manga/pages/Categories/Recomended")
// );
// const Genre = React.lazy(() => import("./Manga/pages/Genre/Genre"));
// const Genres = React.lazy(() => import("./Manga/pages/Genre/Genres"));
// const Discover = React.lazy(() => import("./Manga/pages/Discover/Discover"));
// const Reads = React.lazy(() => import("./Reader/pages/Reads"));
// const AddAndEditManga = React.lazy(() => import("./Reader/pages/AddManga"));
// const Read = React.lazy(() => import("./Reader/pages/Read"));
// const AddChapter = React.lazy(() => import("./Reader/pages/AddChapter"));
// const ChapterReader = React.lazy(() => import("./Reader/pages/ChapterReader"));
// const EditManga = React.lazy(() => import("./Reader/pages/EditManga"));

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
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
