import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import App from "./App";
import { siteContent } from "./content/siteContent";
import { stripBasePath } from "./utils/basePath";
import "./styles/tokens.css";
import "./styles/typography.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/activities.css";
import "./styles/header.css";
import "./styles/experiences.css";

document.documentElement.lang = siteContent.locale;
const routePath = stripBasePath(window.location.pathname);
const routeMetadata =
  routePath === "/activities"
    ? siteContent.activities.metadata
    : siteContent.metadata;
const productionOrigin = "https://ongdeng.github.io";
const canonicalUrl = new URL(
  routePath === "/activities" ? "activities/" : "",
  `${productionOrigin}/Anvelia-06/`
).href;

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
setMetaContent(
  'meta[property="og:url"]',
  { property: "og:url" },
  canonicalUrl
);

const setCanonicalUrl = (href: string) => {
  const canonical =
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
    document.head.appendChild(document.createElement("link"));

  canonical.rel = "canonical";
  canonical.href = href;
};

setCanonicalUrl(canonicalUrl);

document
  .querySelectorAll<HTMLLinkElement>("link[data-base-href]")
  .forEach((link) => {
    const path = link.dataset.baseHref;

    if (path) {
      link.href = `${import.meta.env.BASE_URL}${path}`;
    }
  });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
