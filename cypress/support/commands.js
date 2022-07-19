Cypress.Commands.add('getById', (selector, ...args) => {
  cy.get(`[data-testid=${selector}]`, ...args);
});
