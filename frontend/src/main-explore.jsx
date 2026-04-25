import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ExploreStandalone from "./pages/ExploreStandalone";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ExploreStandalone />
    </BrowserRouter>
  </React.StrictMode>
);
