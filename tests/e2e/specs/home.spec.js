
describe('Started in home page', () => {

  const baseURL = 'http://localhost:8080/';

  beforeEach(() => {
    cy.visit(baseURL);
  });

  it('Check if loading is visible in first', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.base-loading').should('be.visible')
    cy.get('.base-loading').should('not.be.visible')
  });

  it('Visits the app root url', () => {
    cy.get('.header > .header__title').should('have.text', 'Explore o universo');
    cy.get('.header > .header__description').should('have.text', 'Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!');
  });

  it('Search a character in home page', () => {
    cy.get('input[name="search"]').type('3-D Man')
    cy.get('.card-item__title').contains(' 3-D Man ');
  });

  // it('Mark a character as a favorite', () => {
  //   cy.get('.card-item__container .base-favorite__icon').click()
  //   cy.get('base-favorite__icon > img[alt]').contains('favorite-checked')
  // });

})
