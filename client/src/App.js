import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import HomePage from "./Manga/pages/Home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    // error element with main navigation
    errorElement: <h1>Page not found</h1>,
    element: <MainNavigation />,
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
            element: <h1>News</h1>,
          },
          {
            // /news/newsId
            path: ":newsId",
            element: <h1>News Details</h1>,
          },
        ],
      },
      {
        path: "discover",
        children: [
          {
            index: true,
            element: <h1>Discover</h1>,
          },
          {
            path: "top",
            element: <h1>Top</h1>,
          },
          {
            path: "popular",
            element: <h1>Popular</h1>,
          },
          {
            path: "recommendations",
            element: <h1>Recommendations</h1>,
          },
          {
            path: "tags/:tagName",
            element: <h1>Certain tagName</h1>,
          },
        ],
      },
      {
        path: "manga/:mangaId",
        element: <h1>Manga Details</h1>,
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
