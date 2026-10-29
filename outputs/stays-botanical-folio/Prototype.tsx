import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import StaysPreview from "../../src/components/pages/StaysPreview";
import { botanicalStaysContent } from "./content";
import "../../src/styles/tokens.css";
import "../../src/styles/typography.css";
import "../../src/styles/base.css";
import "../../src/styles/components.css";
import "../../src/styles/layout.css";
import "../../src/styles/activities.css";
import "../../src/styles/header.css";
import "./folio.css";

// A private alternative: the existing content/template stays the single source.
createRoot(document.getElementById("root")!).render(
  <div className="stays-botanical-study">
    <StaysPreview content={botanicalStaysContent} />
  </div>
);
