import React from "react";
import { createRoot } from "react-dom/client";
import Settings from './layout/Settings';

const root = createRoot(document.getElementById("bp-settings-page") as HTMLElement);
root.render(
  <React.StrictMode>
    <Settings />
  </React.StrictMode>
);