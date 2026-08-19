import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RootProvider from "@/application/providers/RootProvider.jsx";
import "@/infrastructure/i18n";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootProvider />
    </BrowserRouter>
  </React.StrictMode>,
);
