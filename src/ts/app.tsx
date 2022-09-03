import React from "react";
import { createRoot } from "react-dom/client";
import Settings from "./layout/Settings";

const appTarget = document.getElementById("bp-settings-page") as HTMLElement;
if (appTarget) {
  const root = createRoot(appTarget);
  root.render(
    <React.StrictMode>
      <Settings />
    </React.StrictMode>
  );
}
