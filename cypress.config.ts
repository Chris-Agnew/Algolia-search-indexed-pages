import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    indexHtmlFile: "cypress/support/component-index.html",
    supportFile: false, // Set this to false if no support file is needed
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
  },
});
