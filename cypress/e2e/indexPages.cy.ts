describe("Search Component", () => {
  it("should search and display results", () => {
    cy.visit("/");

    const searchQuery = "an article from a legacy CMS";
    cy.get("[data-cy=search-input]").type(searchQuery);

    cy.get("[data-cy=search-results]").should("exist").and("not.be.empty");
    cy.get("[data-cy=search-result-item]")
      .first()
      .should("contain.text", searchQuery);
  });

  it("should verify Algolia environment variables", () => {
    const appId = Cypress.env("NEXT_PUBLIC_ALGOLIA_APP_ID");
    const apiKey = Cypress.env("NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY");
    const indexName = Cypress.env("NEXT_PUBLIC_ALGOLIA_INDEX_NAME");

    expect(appId).to.equal("YW9HHXMU3W");
    expect(apiKey).to.equal("b8a2b4b726ad8119c987f9e6070b28b3");
    expect(indexName).to.equal("builder_pages_index");
  });
});
