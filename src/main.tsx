import React from "react";
import { createRoot } from "react-dom/client";
import { Charts } from "./components/chart";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Charts />
  </React.StrictMode>
);
