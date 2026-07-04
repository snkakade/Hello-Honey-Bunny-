import { defineConfig } from "astro/config";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  site: isGitHubPages
    ? "https://snkakade.github.io/Hello-Honey-Bunny-/"
    : "https://hellohoneybunny.com",
  base: isGitHubPages ? "/Hello-Honey-Bunny-/" : "/",
  output: "static",
  trailingSlash: "never",
  build: {
    format: "file",
    inlineStylesheets: "never"
  },
  vite: {
    build: {
      assetsInlineLimit: 1024
    }
  }
});
