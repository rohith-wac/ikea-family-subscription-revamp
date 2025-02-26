import { useRoutes, Navigate } from "react-router-dom";
import HomePage from "../pages/Home";
import CommonLayout from "../components/CommonLayout";
import SubscriptionPage from "../pages/Subscription";

const Routes = () => {
  const storedLang = localStorage.getItem("language_type") || "en";
  return useRoutes([
    {
      path: "/",
      element: <CommonLayout />,
      children: [
        { index: true, element: <Navigate to={`/${storedLang}`} replace /> },
        { path: ":lang", element: <HomePage /> },
        { path: "subscription", element: <Navigate to={`/subscription/${storedLang}`} replace /> },
        { path: "subscription/:lang", element: <SubscriptionPage /> },
      ],
    },
  ]);
};

export default Routes;
