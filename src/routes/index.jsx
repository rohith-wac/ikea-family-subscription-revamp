import { useRoutes, Navigate } from "react-router-dom";
import HomePage from "../pages/Home";
import CommonLayout from "../components/CommonLayout";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <CommonLayout />,
      children: [
        { index: true, element: <Navigate to="/en" replace /> }, // Redirect from `/` to `/en`
        { path: ":lang", element: <HomePage /> }, // Dynamic language route
      ],
    },
  ]);
};

export default Routes;
