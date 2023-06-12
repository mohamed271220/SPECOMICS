import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import HomePage from "./Manga/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
