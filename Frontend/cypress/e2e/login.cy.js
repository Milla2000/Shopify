describe('Login Form', () => {
  beforeEach(() => {
      // Visit the login page before each test
      cy.visit('/login.html');
  });

  it('should display the login form', () => {
      cy.get('#login').should('be.visible');
  });

  it('should show an error for empty credentials', () => {
      cy.get('button[type="submit"]').click();

      cy.get('.regError').should('have.text', '');
  });

  it('should show an error for incorrect credentials', () => {
      cy.get('.email').type('ngatiamwai@gmail.com');
      cy.get('.password').type('12345789');
      cy.get('button[type="submit"]').click();

      cy.get('.regError').should('have.text', 'Email does not exist');
  });

  it('should successfully log in as user with valid credentials', () => {
    cy.get('.email').type('ngatiamwai25@gmail.com');
    cy.get('.password').type('123456789');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', 'yourProducts.html');
});

it('should successfully log in as admin with valid credentials', () => {
    cy.get('.email').type('admin@gmail.com');
    cy.get('.password').type('12345678');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', 'adminAllProducts.html');
});

  it('should navigate to the registration page', () => {
      cy.contains('Register').click();

      cy.url().should('include', '/register');
  });

  it('should navigate to the Forgot password page', () => {
      cy.contains('Forgot Password').click();

      cy.url().should('include', '/reset-password');
  });

});
