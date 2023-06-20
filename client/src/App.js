import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./Manga/pages/Home/HomePage";
import News from "./News/pages/News";

import Popular from "./Manga/pages/Categories/Popular";
import SingleNews from "./News/pages/SingleNews";
import TopCategory from "./Manga/pages/Categories/TopCategory";
import MainLayout from "./shared/components/MainLayout";
import MangaDetails from "./Manga/pages/MangaDetails";

import Recomended from "./Manga/pages/Categories/Recomended";

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
            element: <h1>Discover</h1>,
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
            element: <Recomended/>,
          },
          {
            path: "tags/:tagName",
            element: <h1>Certain tagName</h1>,
          },
        ],
      },
      {
        path: "manga/:mangaId",
        element: <MangaDetails/>,
      },
      {
        path: "read",
        children: [
          {
            index: true,
            element: <h1>Read</h1>,
          },
          {
            path: ":mangaId",
            children: [
              {
                index: true,
                element: <h1>Manga Details</h1>,
              },
              {
                path: ":chapterId",
                element: <h1>Chapter Details</h1>,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
