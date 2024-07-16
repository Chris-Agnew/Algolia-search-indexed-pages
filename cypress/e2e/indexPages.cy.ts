describe("Index Builder Content", () => {
  it("should successfully index content from Builder.io to Algolia", () => {
    cy.request({
      method: "POST",
      url: "/api/indexPages",
      failOnStatusCode: false,
    }).then((response) => {
      // Ensure the response status is 200 (OK)
      expect(response.status).to.eq(200);
      // Ensure the response body has the correct message
      expect(response.body).to.have.property(
        "message",
        "Content indexed successfully"
      );
    });
  });

  it("should handle errors gracefully", () => {
    cy.request({
      method: "POST",
      url: "/api/indexPages",
      failOnStatusCode: false,
      headers: {
        "x-builder-api-key": "invalid_key",
      },
    }).then((response) => {
      // Ensure the response status is 500 (Internal Server Error)
      expect(response.status).to.eq(500);
      // Ensure the response body has the correct error message
      expect(response.body).to.have.property(
        "message",
        "Error indexing content"
      );
    });
  });
});
