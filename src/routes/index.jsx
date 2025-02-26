import { useRoutes, Navigate } from "react-router-dom";
import HomePage from "../pages/Home";
import CommonLayout from "../components/CommonLayout";
import SubscriptionPage from "../pages/Subscription";
import { getFromLocalStorage } from "../helpers/functions";
import OrderSuccess from "../components/OrderSuccess";
import OrderFailed from "../components/OrderFailed";

const Routes = () => {
  const storedLang = getFromLocalStorage("language_type") || "en";
  return useRoutes([
    {
      path: "/",
      element: <CommonLayout />,
      children: [
        { index: true, element: <Navigate to={`/${storedLang}`} replace /> },
        { path: ":lang", element: <HomePage /> },
        { path: "subscription", element: <Navigate to={`/subscription/${storedLang}`} replace /> },
        { path: "subscription/:lang", element: <SubscriptionPage /> },
        { path: "order-summary/:orderId/success/:lang", element: <OrderSuccess /> },
        { path: "order-summary/:orderId/failed/:lang", element: <OrderFailed /> },
      ],
    },
  ]);
};

export default Routes;
