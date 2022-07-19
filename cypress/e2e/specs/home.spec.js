describe("[Home page]", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show loading in first and remove it", () => {
    cy.getById("loading").should("be.visible");
    cy.getById("loading").should("not.be.visible");
  });

  it("should show a not find message when search a not valid character", () => {
    cy.getById("search-home").type("Mario{enter}").then(() => {
      cy.getById("search-err").contains("Nenhum resultado encontrado");  
    })
  });

  it("should find the title and description", () => {
    cy.getById("main-title").should(
      "have.text",
      "Explore o universo"
    );
    cy.getById("main-description").should(
      "have.text",
      "Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!"
    );
  });

  it("should search character in home page", () => {
    cy.getById('search-home').type("3-D Man");
    cy.getById("card-item").contains(" 3-D Man ");
  });

  it("should click in favorites options and open a empty list", () => {
    cy.getById("favorites").click();
    cy.getById("no-results").contains("Você não possuí favoritos");
  });
});
