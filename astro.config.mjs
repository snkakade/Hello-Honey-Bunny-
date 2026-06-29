import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://hellohoneybunny.com",
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
