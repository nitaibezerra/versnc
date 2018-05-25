
it('Retorna 200 OK ao acessar a raiz', () => {
  cy.visit('http://localhost:4200/');
});

it('Apresenta descrição Consulte seu Município ou UF', () => {
  cy.visit('http://localhost:4200/home');
  cy.get('app-root snc-busca h4').contains('Consulte o seu Município ou UF');
});

it('Apresenta Tabela na Pagina Inicial', () => {
  cy.visit('http://localhost:4200/');
  cy.get('input').type('{enter}');    
  cy.get('app-root snc-table mat-card');
});

it('Apresenta título MUNICÍPIO na tabela da Página Inicial após pesquisa', () => {
  cy.visit('http://localhost:4200/');
  cy.get('input').type('{enter}');    
  cy.get('.mat-sort-header-button').contains('MUNICÍPIO');
});

it('Apresenta título SITUAÇÃO DA ADESÃO na tabela da Página Inicial após pesquisa', () => {
  cy.visit('http://localhost:4200/');
  cy.get('input').type('{enter}');  
  cy.get('.mat-sort-header-button').eq(1).contains('SITUAÇÂO DA ADESÃO');
});

it('Apresenta título DATA DA ADESÃO na tabela da Página Inicial após pesquisa', () => {
  cy.visit('http://localhost:4200/');
  cy.get('input').type('{enter}');  
  cy.get('.mat-sort-header-button').eq(2).contains('DATA DA ADESÃO');
});

it('Apresenta título DETALHAR na tabela da Página Inicial após pesquisa', () => {
  cy.visit('http://localhost:4200/');
  cy.get('input').type('{enter}');  
  cy.get('.mat-header-cell').eq(3).contains('DETALHAR');
});

it('Apresenta 10 elementos referentes aos municipios', () => {
  cy.visit('http://localhost:4200/');
  cy.get('input').type('{enter}');    
  cy.get('app-root snc-table mat-card mat-table mat-row').should('have.length', 10);
});

it('Apresenta o componente de paginação', () => {
  cy.visit('http://localhost:4200/');
  cy.get('input').type('{enter}');    
  cy.get('app-root snc-table mat-card mat-paginator');
});

it('Apresenta dados nas linhas da tabela', () => {
  cy.visit('http://localhost:4200/tabela-uf-municipio');
  cy.get('app-root snc-table mat-card mat-table mat-row').should('not.be.empty');
});
