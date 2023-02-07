import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const { REACT_APP_BASE_URL } = process.env;
root.render(
  <React.StrictMode>
    <BrowserRouter basename={REACT_APP_BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
