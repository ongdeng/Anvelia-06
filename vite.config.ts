import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const buildSha =
  (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env?.GITHUB_SHA ?? "local";

const injectBuildMarker = () => ({
  name: "anvelia-build-marker",
  transformIndexHtml(html: string) {
    return html.replace(
      "</head>",
      `    <meta name="anvelia-build" content="${buildSha}" />\n  </head>`
    );
  }
});

const htmlEntry = (relativePath: string) =>
  decodeURIComponent(new URL(relativePath, import.meta.url).pathname).replace(
    /^\/([A-Za-z]:)/,
    "$1"
  );

export default defineConfig(({ mode }) => ({
  base: mode === "github-pages" ? "/Anvelia-06/" : "/",
  plugins: [react(), injectBuildMarker()],
  build: {
    rollupOptions: {
      input: {
        main: htmlEntry("./index.html"),
        activities: htmlEntry("./activities/index.html")
      }
    }
  },
  test: {
    environment: "jsdom",
    exclude: ["node_modules/**", "dist/**", "tests/e2e/**"],
    globals: true
  }
}));
