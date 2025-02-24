import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/Home";
import CommonLayout from "../components/CommonLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { index: true, element: <Navigate to="/en" replace /> },
      { path: ":lang", element: <HomePage /> },
    ],
  },
]);

const Routes = () => (
  <RouterProvider
    router={router}
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  />
);

export default Routes;
