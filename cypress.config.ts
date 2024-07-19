import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY:
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_API_KEY: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
    NEXT_PUBLIC_ALGOLIA_INDEX_NAME: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    indexHtmlFile: "cypress/support/component-index.html",
    supportFile: "cypress/support/component.ts",
  },
  e2e: {
    baseUrl: "https://builderio-algolia-index.vercel.app",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
});
