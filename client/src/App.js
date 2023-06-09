import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
  },
]);

function App() {
  <RouterProvider router={router} />;
}

export default App;
