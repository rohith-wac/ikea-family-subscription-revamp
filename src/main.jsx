import { createRoot } from "react-dom/client";
import Routes from "./routes";
import Context from "./context";
import { BrowserRouter } from "react-router-dom";
import "./styles/common.scss";

createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Context>
      <Routes />
    </Context>
  </BrowserRouter>
);
