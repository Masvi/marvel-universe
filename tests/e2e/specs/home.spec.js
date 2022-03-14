
describe('Started in home page', () => {
  
  const baseURL = 'http://localhost:8080/';
  const apiBase = 'https://gateway.marvel.com/v1/public/';
  const ts = new Date().getTime();
  const hash = ts+process.env.VUE_APP_PRIVATE_KEY+process.env.VUE_APP_PUBLIC_KEY;


  beforeEach(() => {
    cy.visit(baseURL);
  });

  it('Check if loading is visible in first', () => {
    cy.get('.base-loading').should('be.visible')
    cy.get('.base-loading').should('not.be.visible')
  });

  it('trying search a specific characters  of that not exists', () => {
    cy.get('[data-testid=search-home]')
      .type('Mario{enter}')
      cy.wait(300);
      cy.get('[data-testid=search-err]').contains(
        'Nenhum resultado encontrado'
      );
  });

  it('trying search characters on api', () => {
    cy.server()
      .route(
        'GET',
        `${apiBase}/characters?&ts=${ts}&apikey=${process.env.VUE_APP_PUBLIC_KEY}&hash=${hash}`
      )
      .its('status')
      .then((status) => {
        expect(status).to.eq(200);
      });
  });

  it('Visits the app root url', () => {
    cy.get('.header > .header__title').should('have.text', 'Explore o universo');
    cy.get('.header > .header__description').should('have.text', 'Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!');
  });

  it('Search a character in home page', () => {
    cy.get('input[name="search"]').type('3-D Man')
    cy.get('.card-item__title').contains(' 3-D Man ');
  });

  it('Trying show a favorite list', () => {
    cy.get('.home__favorites').click()
    cy.get('.home__title').contains('Sua lista de favoritos');
  });

});
