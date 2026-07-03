import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import App from "./App";
import { siteContent } from "./content/siteContent";
import "./styles/tokens.css";
import "./styles/typography.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/layout.css";

document.documentElement.lang = siteContent.locale;
document.title = siteContent.metadata.title;

const metaDescription =
  document.querySelector<HTMLMetaElement>('meta[name="description"]') ??
  document.head.appendChild(document.createElement("meta"));

metaDescription.name = "description";
metaDescription.content = siteContent.metadata.description;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
