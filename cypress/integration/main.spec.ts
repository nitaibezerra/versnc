it('Retorna 200 OK ao acessar a raiz', () => {
  cy.visit('http://localhost:4200/');
});

it('Apresenta titulo da Aplicação na Tela Inicial', () => {
  cy.visit('http://localhost:4200/');
  cy.get('app-root h1').contains('VerSNC');
});

it('Apresenta Tabela na Pagina Inicial', () => {
  cy.visit('http://localhost:4200/');
  cy.get('app-root snc-table mat-table');
});

it('Apresenta cidade na tabela da Página Inicial', () => {
  cy.visit('http://localhost:4200/');
  cy.get('app-root snc-table mat-table mat-header-row').contains('Cidade');
});

it('Apresenta UF na tabela da Página Inicial', () => {
  cy.visit('http://localhost:4200/');
  cy.get('app-root snc-table mat-table mat-header-row').contains('Uf');
});

it('Apresenta 10 elementos referentes aos municipios', () => {
  cy.visit('http://localhost:4200/');
  cy.get('app-root snc-table mat-table mat-row').should('have.length', 10);
});

it('Apresenta o componente de paginação', () => {
  cy.visit('http://localhost:4200/');
  cy.get('app-root snc-table mat-table mat-paginator');
});

it('Apresenta dados nas linhas da tabela', () => {
  cy.visit('http://localhost:4200/');
  cy.get('app-root snc-table mat-table mat-row').should('not.be.empty');
});
