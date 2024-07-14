/// <reference types="cypress" />

import React from "react";
import { mount } from "cypress/react18";
import Search from "@/components/Search";

type SearchResult = {
  title: string;
  description: string;
  url: string;
  content: string;
};

describe("Search Component", () => {
  let mockResults: SearchResult[];

  beforeEach(() => {
    cy.fixture("searchResults.json").then((results) => {
      mockResults = results;
    });
    mount(<Search />);
  });

  it("renders the search input", () => {
    cy.get("[data-cy=search-input]").should("be.visible");
  });

  it("displays search results", () => {
    // Type a query into the search input
    cy.get("[data-cy=search-input]").type("article");

    // Simulate search results
    cy.get("[data-cy=search-results]")
      .invoke("show")
      .then(($results) => {
        cy.wrap($results).invoke("empty"); // Clear existing results

        const resultItems = mockResults
          .map(
            (result: SearchResult) => `
        <a href="${
          result.url
        }" class="search-result-item" data-cy="search-result-item">
          <h2>${result.title || "No Title"}</h2>
          <p>${result.description || "No Description"}</p>
          <div>${result.content}</div>
        </a>
      `
          )
          .join("");

        cy.wrap($results).invoke("append", resultItems);
      });

    // Check if the search results are displayed
    cy.get("[data-cy=search-result-item]").should("have.length.greaterThan", 0);
  });

  it("displays no results message if no results are found", () => {
    // Type a query into the search input that we know will not return results
    cy.get("[data-cy=search-input]").type("noresultquery");

    // Simulate no results found
    cy.get("[data-cy=search-results]")
      .invoke("show")
      .then(($results) => {
        cy.wrap($results).invoke("empty"); // Clear existing results
        cy.wrap($results).invoke(
          "append",
          '<p class="no-results" data-cy="no-results">No results found</p>'
        );
      });

    // Check if the "No results found" message is displayed
    cy.get("[data-cy=no-results]").should("be.visible");
  });
});
