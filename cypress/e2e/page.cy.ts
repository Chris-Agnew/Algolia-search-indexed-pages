describe("Individual Page", () => {
  beforeEach(() => {
    cy.visit("/an-article-from-a-legacy-cms"); // Replace with a valid slug from your indexed pages
  });

  it("should display the page title and description", () => {
    // Verify that the page title is displayed and contains the correct text
    cy.get(".page-content h2", { timeout: 10000 }).should(
      "contain",
      "an article from a legacy CMS"
    ); // Update with actual page title

    // Verify that the page description is displayed and contains the correct text
    cy.get(".page-content p", { timeout: 10000 }).should(
      "contain",
      "This article comes from a legacy CMS, and includes some html in the article body."
    );
  });

  it("should display the content blocks", () => {
    // Wait for content to load and check for the presence of content blocks
    cy.get("body").then(($body) => {
      cy.log($body.html()); // Log the body content for debugging
    });

    // Wait for a short time to ensure content is loaded
    cy.wait(2000);

    // Verify that content blocks are present
    cy.get(".content-block", { timeout: 10000 }).should(
      "have.length.greaterThan",
      0
    );
  });

  it("should display the search input", () => {
    // Verify that the search input is visible
    cy.get(".search-input").should("be.visible");
  });
});
