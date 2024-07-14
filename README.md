# Project Details

This repository contains a Next.js 14 application integrated with Cypress for both end-to-end (E2E) and component testing that includes a script to index pages from Builder.io to Algolia and searchable searchbar with autocomplete. Indexed pages show on bottom of search bar for easy access (fine for small test projects)

## Documentation

[Next.js](https://nextjs.org/)\
[Algolia](https://www.algolia.com/doc/)\
[Algolia Search Client](https://www.algolia.com/doc/api-client/getting-started/install/javascript/?client=javascript)\
[Builder.io](https://www.builder.io/c/docs/developers)\
[Builder.io Content API](https://www.builder.io/c/docs/content-api)\
[Cypress](https://docs.cypress.io/guides/overview/why-cypress)

## Deployment

To deploy this project run

```bash
git clone git@github.com:Chris-Agnew/alipes-dev-assessment.git
cd builder-app-starter
npm install
```

To index pages to Algolia

```bash
npm run index-pages
```

Start Development Server

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to see the application in action.

## Running Tests

Running Cypress Tests in Cypress UI pick either component or E2E

```bash
npm run cypress:open
```

Running Cypress E2E headless

```bash
npx cypress run
```

Running Cypress Component test headless

```bash
npx cypress run --component
```
