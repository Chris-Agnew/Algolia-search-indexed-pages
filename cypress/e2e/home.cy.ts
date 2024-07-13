describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the header and search input", () => {
    cy.get(".header h1").should(
      "contain",
      "Welcome to Builder.io Pages Search"
    );
    cy.get(".header p").should(
      "contain",
      "Use the search below to find Builder.io pages:"
    );
    cy.get(".search-input").should("be.visible");
  });

  it("should display indexed pages", () => {
    cy.get(".indexed-pages h2").should("contain", "Indexed Pages");
    cy.get(".page-item").should("have.length.greaterThan", 0);
    cy.get(".page-item")
      .first()
      .within(() => {
        cy.get("h3").should("exist");
        cy.get("p").should("exist");
      });
  });

  it("should navigate to a page when an indexed page is clicked", () => {
    cy.get(".page-item").first().click();
    cy.url().should("not.equal", "http://localhost:3000/");
    cy.get(".page-content h2").should("exist");
  });
});
