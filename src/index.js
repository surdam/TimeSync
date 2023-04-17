import React from "react";
import { createRoot } from "react-dom";
import App from "./App";
import "./styles.css";

const root = document.getElementById("root");
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
