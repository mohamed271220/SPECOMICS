import { useCallback, useState } from "react";
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
import AddAndEditManga from "./Reader/pages/AddAndEditManga";
import Read from "./Reader/pages/Read";

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
                element: <h1>add chapter</h1>,
              },
              {
                path: "edit",
                element: <h1>Edit Manga</h1>,
              },
              {
                path: ":chapterId",
                element: <h1>Chapter Details</h1>,
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

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const login = useCallback((userId, token) => {
    setToken(token);
    setUserId(userId);
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
