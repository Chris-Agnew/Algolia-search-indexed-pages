// would love some feedback on how to get this to work without bypassing the NEXT_NOT_FOUND error

/// <reference types="cypress" />

describe("404 Not Found Page", () => {
  beforeEach(() => {
    // Handle uncaught exceptions
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("NEXT_NOT_FOUND")) {
        return false; // Prevent Cypress from failing the test
      }
    });
    cy.visit("/non-existent-page", { failOnStatusCode: false }); // Visit a non-existent page
  });

  it("should display the 404 Not Found message", () => {
    // Verify that the 404 message is displayed
    cy.get("h1").should("contain", "404 - Page Not Found");
    cy.get("p")
      .first()
      .should("contain", "Sorry, the page you are looking for does not exist.");
    cy.get("p").eq(1).should("contain", "Redirecting to the homepage...");
    cy.get("a.home-link").should("contain", "Go back to the homepage");
  });

  it("should redirect to the home page after 2 seconds", () => {
    // Wait for 2 seconds and check if redirected to the home page
    cy.wait(2000);
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
