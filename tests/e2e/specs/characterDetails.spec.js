
describe('Started in home page', () => {
  
  const baseURL = 'http://localhost:8080/details/1009144';  
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it('Check if loading is visible in first', () => {
    cy.get('.base-loading').should('be.visible')
    cy.get('.base-loading').should('not.be.visible')
  });

  it('trying search a specific characters  of that not exists', () => {
    cy.get('input[name="search"]')
      .type('Mario').type('{enter}')
    
    cy.get('div[data-test="search-details"]')
      .contains('Personagem não encontrado');
  });

  it('Trying show a favorite list', () => {
    cy.get('span[data-test="favorite-details"]').click()
    cy.get('img').each($el => {
      cy.wrap($el).should('have.attr', 'alt')
    });
  });

});
