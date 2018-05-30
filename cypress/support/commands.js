// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('api', () => {
  cy.server()           // enable response stubbing
  cy.route({
    method: 'GET',      // Route all GET requests
    url: 'http://snchomolog.cultura.gov.br/api/v1/sistemadeculturalocal/?limit=&offset=&nome_municipio=&estado_sigla=&cnpj_prefeitura=',    // that have a URL that matches '/users/*'
    response: 'fixture:entidadeResponse'        // and force the response to be: []
  })
 });
//  node_modules/.bin/cypress open

