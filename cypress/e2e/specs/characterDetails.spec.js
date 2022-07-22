describe("[Detail page]", () => {
  beforeEach(() => {
    cy.visit("/details/1011334");
  });

  it("should show loading in first and remove it", () => {
    cy.getById("loading").should("be.visible");
    cy.getById("loading").should("not.be.visible");
  });

  it("should render title correctly", () => {
    cy.getById("name-title").should("have.text", " 3-D Man ");
  });

  it("should check the alt attribute of images", () => {
    cy.get("img").each(($el) => {
      cy.wrap($el).should("have.attr", "alt");
    });
  });

  it("should favorited a character correctly", () => {
    cy.getById("favorite-icon").click()
    cy.getById("icon-01").should("be.visible");
  });

  it("should render subtitle correctly", () => {
    cy.getById("secondary-title").contains("Últimos lançamentos")
  });
});
