import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const htmlEntry = (relativePath: string) =>
  decodeURIComponent(new URL(relativePath, import.meta.url).pathname).replace(
    /^\/([A-Za-z]:)/,
    "$1"
  );

export default defineConfig(({ mode }) => ({
  base: mode === "github-pages" ? "/Anvelia-06/" : "/",
  plugins: [react()],
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
