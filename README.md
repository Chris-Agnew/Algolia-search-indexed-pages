[![CI](https://github.com/Chris-Agnew/alipes-dev-assessment/actions/workflows/ci.yml/badge.svg)](https://github.com/Chris-Agnew/alipes-dev-assessment/actions/workflows/ci.yml)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

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

## Continuous Integration with GitHub Actions

The GitHub Actions workflow is configured to perform the following tasks:

    1.	Checkout Code: Checks out the code from the repository.
    2.	Set Up Node.js: Sets up Node.js environment for the project.
    3.	Install Dependencies: Installs the required npm dependencies.
    4.	Run Tests: Executes the Cypress tests to ensure the application is working as expected.
    5.	Build Application: Builds the Next.js application.
    6.	Deploy to Vercel: Deploys the application to Vercel.

## Secrets Configuration

For deploying to Vercel, you need to set up a Vercel token as a secret in your GitHub repository:

    1.	Go to your GitHub repository.
    2.	Navigate to Settings > Secrets > New repository secret.
    3.	Add a new secret with the name VERCEL_TOKEN and the value of your Vercel token.

Running the Workflow

The workflow is triggered on every push and pull request to the main branch. It checks out the code, sets up Node.js, installs dependencies, runs tests, builds the application, and deploys it to Vercel.
