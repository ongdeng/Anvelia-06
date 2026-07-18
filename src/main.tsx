import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import App from "./App";
import { siteContent } from "./content/siteContent";
import { stripBasePath } from "./utils/basePath";
import "./styles/tokens.css";
import "./styles/typography.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/activities.css";

document.documentElement.lang = siteContent.locale;
const routePath = stripBasePath(window.location.pathname);
const routeMetadata =
  routePath === "/activities"
    ? siteContent.activities.metadata
    : siteContent.metadata;

document.title = routeMetadata.title;

const setMetaContent = (
  selector: string,
  attributes: Record<string, string>,
  content: string
) => {
  const meta =
    document.querySelector<HTMLMetaElement>(selector) ??
    document.head.appendChild(document.createElement("meta"));

  for (const [name, value] of Object.entries(attributes)) {
    meta.setAttribute(name, value);
  }

  meta.content = content;
};

setMetaContent(
  'meta[name="description"]',
  { name: "description" },
  routeMetadata.description
);
setMetaContent(
  'meta[property="og:title"]',
  { property: "og:title" },
  routeMetadata.title
);
setMetaContent(
  'meta[property="og:description"]',
  { property: "og:description" },
  routeMetadata.description
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
